# my-super-table
Improved HTML Table

## Table options:

### firstColumn: (string)
-------------------------

Determines which column should be the first in the generated table.

Possible values : One of the keys from the given array

Default value : First key of the array

### rowHeight: (integer)
------------------------

Defines rows height in pixels.

Possible values : Any integer

Default value : `30`

### rowMouseOver: (boolean)
---------------------------

Determines whether the row where the user  has his pointers should be highlighted or not.

Possible values : `true | false`

Default value : `true`

### rowStyle: (string)
----------------------

Defines Row styles : 
+ `'free'` : Rows have no border
+ `'line'` : Rows have borders on inferior and superior side
+ `'zebra'` : Rows have borders on inferior and superior side, and every two line is colored (one line `lightsteelblue`, one line `white`).

Possible values : `'free' | 'line' | 'zebra'`

Default value : `'free'`

### fixedHeader: (boolean)
--------------------------

Determines whether header bar should be fixed or not.

Possible values : `true | false`

Default value : `true`

### fixedColumn: (boolean)
--------------------------

Determines whether first column should be fixed or not.

Possible values : `true | false`

Default value : `true`

### sortUsersBy: (object)
-------------------------

`sortUsersBy` has two properties: 

+ `by` : Determines by which property the list should be sorted.
  + Possible values : One of the keys from the given array.
  + Default value : `false` (sort is not applicated)

+ `asc` : Determines whether the list order should be ascending or descending.
  + Possible values : `true | false`
  + Default value : `true`

### rowHoverHeight: (object)
----------------------------

`rowHoverHeight` has two properties : 

+ `enabled` : Determines whether the option should be enabled or not.
  + Possible values : `true | false`
  + Default value : `false`

+ `height` : Defines rows height in pixels when hovering them.
  + Possible values : any integer
  + default value : none