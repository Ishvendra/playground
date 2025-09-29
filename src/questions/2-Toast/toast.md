## Toast notification

### Req. gathering

1. Should the toast auto dismiss and user dismissed?
2. What all props are required? type, delay, message, position?

### High level design (draw).

1. Toast container (fixed) (contains the list)
2. Toast items (stacked) 5. Add/remove flow

### Optimization:

1. Context/Portal for global usage if it needs to be app-wide.
