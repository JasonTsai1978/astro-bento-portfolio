import { createSignal, For, onCleanup, onMount } from "solid-js";
import { drag, geoCentroid, geoOrthographic, geoPath, interpolate, select, timer } from "d3";
import worldData from "../lib/world.json";

// 去過的地方。地圖資料（world.json）裡有形狀的國家整塊上色；
// 太小而沒有形狀的（新加坡、香港、澳門）用座標畫圓點。
type Place = { name: string; point?: [number, number] };

const VISITED: Place[] = [
  { name: "Japan" },
  { name: "China" },
  { name: "Hong Kong", point: [114.17, 22.32] },
  { name: "Macao", point: [113.55, 22.2] },
  { name: "Singapore", point: [103.82, 1.35] },
  { name: "Indonesia" },
  { name: "Turkey" },
  { name: "Egypt" },
  { name: "Italy" },
  { name: "Spain" },
  { name: "Austria" },
  { name: "Czech Republic" },
];

// 出發點：新竹
const HOME: [number, number] = [120.97, 24.8];
const START: [number, number] = [-120, -23];

type Feature = { type: string; properties: { name: string }; geometry: unknown };
const features = (worldData as unknown as { features: Feature[] }).features;
const visitedNames = new Set(VISITED.map((p) => p.name));

const GlobeComponent = () => {
  let box: HTMLDivElement | undefined;
  const [active, setActive] = createSignal<string>();
  // 由 onMount 填入：把地球轉到某個地方
  let focus: (place: Place) => void = () => {};

  onMount(() => {
    if (!box) return;
    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

    const projection = geoOrthographic().rotate(START).clipAngle(90);
    const path = geoPath(projection);

    const svg = select(box).append("svg").attr("role", "img").attr("aria-label", "Globe with visited countries highlighted");
    const ocean = svg.append("circle").attr("class", "ocean");
    const land = svg
      .append("g")
      .selectAll("path")
      .data(features)
      .enter()
      .append("path")
      .attr("class", (d) => (visitedNames.has(d.properties.name) ? "land visited" : "land"))
      .attr("data-name", (d) => d.properties.name);
    const dots = svg
      .append("g")
      .selectAll("path")
      .data(VISITED.filter((p) => p.point))
      .enter()
      .append("path")
      .attr("class", "dot")
      .attr("data-name", (d) => d.name);
    const home = svg.append("path").attr("class", "home");

    const point = (c: [number, number]) => ({ type: "Point", coordinates: c }) as never;

    function draw() {
      land.attr("d", (d) => path(d as never));
      path.pointRadius(Math.max(3, projection.scale() / 55));
      dots.attr("d", (d) => path(point(d.point!)));
      home.attr("d", path(point(HOME)));
    }

    // 尺寸跟著容器走：地球直徑＝容器寬度，手機上不會被裁掉
    function resize() {
      const size = box!.clientWidth;
      if (!size) return;
      svg.attr("width", size).attr("height", size).attr("viewBox", `0 0 ${size} ${size}`);
      projection.scale(size / 2 - 2).translate([size / 2, size / 2]);
      ocean.attr("cx", size / 2).attr("cy", size / 2).attr("r", projection.scale());
      draw();
    }
    const observer = new ResizeObserver(resize);
    observer.observe(box);
    resize();

    // 自動慢轉；拖曳或點選地名後先停一下再繼續
    let pausedUntil = 0;
    let last = 0;
    const spin = timer((elapsed) => {
      const dt = elapsed - last;
      last = elapsed;
      if (reduced || elapsed < pausedUntil) return;
      const r = projection.rotate();
      projection.rotate([r[0] - dt * 0.012, r[1], r[2]]);
      draw();
    });
    const pause = (ms: number) => {
      pausedUntil = last + ms;
    };

    // 拖曳轉動
    svg.call(
      drag<SVGSVGElement, unknown>()
        .on("start", () => svg.classed("dragging", true))
        .on("drag", (event) => {
          const k = 90 / projection.scale();
          const r = projection.rotate();
          projection.rotate([r[0] + event.dx * k, Math.max(-60, Math.min(60, r[1] - event.dy * k)), r[2]]);
          pause(4000);
          draw();
        })
        .on("end", () => svg.classed("dragging", false)),
    );

    let turning: ReturnType<typeof timer> | undefined;
    focus = (place) => {
      const feature = features.find((f) => f.properties.name === place.name);
      const centre = place.point ?? (feature ? geoCentroid(feature as never) : undefined);
      if (!centre) return;
      setActive(place.name);
      svg.selectAll(".land, .dot").classed("active", function () {
        return (this as Element).getAttribute("data-name") === place.name;
      });
      const from = projection.rotate();
      const to: [number, number, number] = [-centre[0], Math.max(-60, Math.min(60, -centre[1])), 0];
      // 走經度上比較短的那一邊
      const start: [number, number, number] = [from[0] + Math.round((to[0] - from[0]) / 360) * 360, from[1], from[2]];
      turning?.stop();
      pause(6000);
      if (reduced) {
        projection.rotate(to);
        draw();
        return;
      }
      const tween = interpolate(start, to);
      const duration = 900;
      turning = timer((t) => {
        const p = Math.min(1, t / duration);
        // ease-in-out
        projection.rotate(tween(p < 0.5 ? 2 * p * p : 1 - Math.pow(-2 * p + 2, 2) / 2) as [number, number, number]);
        draw();
        if (p === 1) turning?.stop();
      });
    };

    onCleanup(() => {
      spin.stop();
      turning?.stop();
      observer.disconnect();
    });
  });

  return (
    <div class="globe-wrap">
      <div class="globe-stage">
        <div class="globe-box" ref={box}></div>
      </div>
      <div class="globe-side">
        <p class="label">{VISITED.length} places · tap one to spin the globe there</p>
        <ul class="places">
          <For each={VISITED}>
            {(place) => (
              <li>
                <button aria-pressed={active() === place.name} onClick={() => focus(place)} type="button">
                  {place.name}
                </button>
              </li>
            )}
          </For>
        </ul>
        <p class="legend">
          <span class="key visited"></span> Visited
          <span class="key home"></span> Home, Hsinchu
        </p>
      </div>
    </div>
  );
};

export default GlobeComponent;
