### 1. Building the grid

1.  Generate the dynamic array
2.  Style the grid container by passing rows and cols varibles.

```
style={{['--rows' as string]: ROWS}}
```

3.  Style the inner

### 2. Grid Selection logic

    A.  states: isMouseDown ,  selectedBoxes
    B.  onMouseDown: Checks the starting cube
        i) isMouseDown -> true
        ii) selecetdBoxes([boxNumber])
    C.  onMouseEnter: Tracks the current cube (Main logic)
        Since the grid is in 1D array form, I’ll need to map box numbers into rows/cols using division and modulus. Then I’ll get the rectangle boundaries with min/max, and finally loop through to select everything inside.
    D.  onMouseUp: Tracks the last cube
        i) isMouseDown -> false

### 3. Reverse grid selection logic
