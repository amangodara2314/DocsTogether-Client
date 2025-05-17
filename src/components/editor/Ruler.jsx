export default function Ruler({
  pageWidth,
  rulerRef,
  setIsDraggingLeft,
  setIsDraggingRight,
  leftMargin,
  rightMarginPosition,
}) {
  return (
    <div className="pr-2 bg-white border-b">
      <div
        ref={rulerRef}
        className="relative h-8 bg-white select-none"
        style={{ width: `${pageWidth}px`, margin: "0 auto" }}
      >
        {/* Improved ruler design */}
        <div className="absolute inset-0 flex">
          <div className="absolute top-0 left-0 right-0 h-[1px] bg-gray-300"></div>
          <div className="absolute bottom-0 left-0 right-0 h-[1px] bg-gray-300"></div>

          {[...Array(Math.floor(pageWidth / 10))].map((_, i) => (
            <div
              key={i}
              className="flex-1 flex flex-col items-center justify-end"
              style={{ maxWidth: "10px" }}
            >
              <div
                className={`${
                  i % 10 === 0
                    ? "h-3 w-[1px] bg-gray-700"
                    : i % 5 === 0
                    ? "h-2 w-[1px] bg-gray-500"
                    : "h-1 w-[1px] bg-gray-400"
                }`}
              ></div>
              {i % 10 === 0 && (
                <span className="text-[9px] text-gray-600 font-medium mt-[1px]">
                  {i / 10}
                </span>
              )}
            </div>
          ))}
        </div>

        <div
          onMouseDown={() => setIsDraggingLeft(true)}
          className="absolute top-0 h-full w-[2px] bg-blue-500 cursor-ew-resize ease-in hover:w-[3px] hover:bg-blue-600 z-10"
          style={{ left: `${leftMargin}px` }}
          title="Left margin"
        />
        <div
          onMouseDown={() => setIsDraggingRight(true)}
          className="absolute top-0 h-full w-[2px] bg-blue-500 cursor-ew-resize ease-in hover:w-[3px] hover:bg-blue-600 z-10"
          style={{ left: `${rightMarginPosition}px` }}
          title="Right margin"
        />
      </div>
    </div>
  );
}
