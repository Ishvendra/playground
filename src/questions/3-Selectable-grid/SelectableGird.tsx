import { useState } from 'react';
import './grid-style.css';

const ROWS = 10;
const COLS = 10;

const SelectableGrid = () => {
  const [isMouseDown, setIsMouseDown] = useState(false);
  const [selectedBoxes, setSelectedBoxes] = useState<number[]>([]);
  const handleMouseDown = (boxNumber: number) => {
    setIsMouseDown(true);
    setSelectedBoxes([boxNumber]);
  };
  const handleMouseEnter = (boxNumber: number) => {
    if (isMouseDown) {
      const startBox = selectedBoxes[0];
      const endBox = boxNumber;

      const startRow = Math.floor(startBox / COLS);
      const startCol = startBox % COLS;
      const endRow = Math.floor(endBox / COLS);
      const endCol = endBox % COLS;

      //Reverse selection logic

      const minRow = Math.min(startRow, endRow);
      const maxRow = Math.max(startRow, endRow);
      const minCol = Math.min(startCol, endCol);
      const maxCol = Math.max(startCol, endCol);

      const selected = [startBox];
      for (let row = minRow; row <= maxRow; row++) {
        for (let col = minCol; col <= maxCol; col++) {
          selected.push(row * COLS + col);
        }
      }

      setSelectedBoxes(selected);
    }
  };

  const handleMouseUp = () => {
    setIsMouseDown(false);
  };

  return (
    <div className='grid-app-container'>
      <div
        className='custom-grid'
        style={{
          ['--rows' as string]: ROWS,
          ['--cols' as string]: COLS,
        }}
        onMouseUp={handleMouseUp}
      >
        {[...Array(ROWS * COLS).keys()].map((item) => (
          <div
            className={`custom-box ${
              selectedBoxes.includes(item) ? 'selected-box' : ''
            }`}
            key={item}
            onMouseDown={() => handleMouseDown(item)}
            onMouseEnter={() => handleMouseEnter(item)}
          >
            {item}
          </div>
        ))}
      </div>
    </div>
  );
};

export default SelectableGrid;
