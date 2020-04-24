# Linear Transformation

Class representing a linear Transformation

## Table of contents

 - [Constructor](#Constructor)
 - [Attributes](#attributes)
 - [Methods](#methods)
    - [Static methods](#static-methods)
    - [Instance methods](#instance-methods)
    
## Constructor

```javascript
LinearTransformation(matrix)
```

#### Parameters
vector : **number[ ][ ] | Matrix** - the matrix representing the linear transformation

## Attributes

```javascript
transformationMatrix : number [ ][ ]
```
the matrix the represent the linear transformation

## Methods

### Static Methods

```javascript
LinearTransformation.apply(trMatrix, matrix)
```

#### Parameters

- trMatrix : **number[ ][ ] | Matrix** - the matrix representing the linear transformation
- matrix : **number [ ] | Vector | number[ ][ ] | Matrix** - the matrix or the vector where to apply the linear transformation


#### Returns

**number[ ] | number [ ][ ]** - the transformed vector/matrix

---

```javascript
LinearTransformation.applyInverse(trMatrix, matrix)
```

Applied the inverse of the given linear transformation

#### Parameters

- trMatrix : **number[ ][ ] | Matrix** - the matrix representing the linear transformation to invert
- matrix : **number [ ] | Vector | number[ ][ ] | Matrix** - the matrix or the vector where to apply the linear transformation


#### Returns

**number[ ] | number [ ][ ]** - the transformed vector/matrix

---

### Instance Methods

```javascript
.apply(matrix)
```

#### Parameters

- matrix : **number [ ] | Vector | number[ ][ ] | Matrix** - the matrix or the vector where to apply the linear transformation


#### Returns

**number[ ] | number [ ][ ]** - the transformed vector/matrix

---

```javascript
.applyInverse(matrix)
```

Applied the inverse of the linear transformation

#### Parameters

- matrix : **number [ ] | Vector | number[ ][ ] | Matrix** - the matrix or the vector where to apply the linear transformation


#### Returns

**number[ ] | number [ ][ ]** - the transformed vector/matrix
