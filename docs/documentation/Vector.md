# Vector

The class representing the vector

## Table of contents

 - [Constructor](#Constructor)
 - [Attributes](#attributes)
 - [Methods](#methods)
    - [Static methods](#static-methods)
    - [Instance methods](#instance-methods)

## Constructor

```javascript
Vector(vector)
```

#### Parameters
vector : **number[ ]** - the array the represent the vector

## Attributes

```javascript
.vector : number[ ]
```
the array representing the vector

## Methods

### Static Methods

#### Vector Creation

```javascript
Vector.createEmptyVector(dim)
```

#### Parameters

- dim : **number** - the dimension of the vector

#### Returns

**number[ ]** - an empty vector of the given dimension

---

```javascript
Vector.createRandomVector(dim, min, max)
```

#### Parameters

- dim : **number** - the dimension of the vector
- min : **number** - the min number of the random range
- max : **number** - the max number of the random range
#### Returns

**number[ ]** - an vector of the given dimension filled with random number in the given range

---

```javascript
Vector.print(vector)
```
Print the given vector

#### Parameters

- vector : **number[ ] | Vector** - the vector to print

---

```javascript
Vector.getCopy(vector)
```

#### Parameters

- vector : **number[ ] | Vector** - the vector to copy

#### Returns

**number[ ]** - the copy of the given vector

---

```javascript
Vector.getNorm(vector)
```

#### Parameters

- vector : **number[ ] | Vector** - the vector

#### Returns

**number** - the norm of the given vector

---

```javascript
Vector.scalarProduct(vector, scalar)
```

#### Parameters

- vector : **number[ ] | Vector** - the vector
- scalar : **number** - scalar to  

#### Returns

**number[ ]** - the vector multiplied by the scalar

---

```javascript
Vector.dotProduct(vector1, vector2)
```

#### Parameters

- vector1 : **number[ ] | Vector** - the first vector of the dot product
- vector2 : **number[ ] | Vector** - the second vector of the dot product

#### Returns

**number** - the dot between the two vectors

---

```javascript
Vector.crossProduct(vector1, vector2)
```

> **Note**: the two vectors must be 3d vector

#### Parameters

- vector1 : **number[ ] | Vector** - the first vector of the cross product
- vector2 : **number[ ] | Vector** - the second vector of the cross product

#### Returns

**number[ ]** - the cross product between the two vectors

---

#### Vector Operation - Sum

```javascript
Vector.sum(vector1, vector2)
```

#### Parameters

- vector1 : **number[ ] | Vector** - the first vector of the sum
- vector2 : **number[ ] | Vector** - the second vector of the sum

#### Returns

**number[ ]** - The sum of the two vectors

---

#### Vector Operation - Sum

```javascript
Vector.sub(vector1, vector2)
```

#### Parameters

- vector1 : **number[ ] | Vector** - the first vector of the subtraction
- vector2 : **number[ ] | Vector** - the second vector of the subtraction

#### Returns

**number[ ]** - The subtraction of the two vectors (vector1 - vector2)

---

```javascript
Vector.euclideanDistance(vector1, vector2)
```

#### Parameters

- vector1 : **number[ ] | Vector** - the first vector 
- vector2 : **number[ ] | Vector** - the second vector 

#### Returns

**number[ ]** - he euclidean distance between the two vectors

---

```javascript
Vector.getAngle(vector1, vector2, angleType='deg')
```

#### Parameters

- vector1 : **number[ ] | Vector** - the first vector 
- vector2 : **number[ ] | Vector** - the second vector 
- angleType : **string** - angleType the type of angle to return: radians = "rad", degree ="deg", by default is 'deg'

#### Returns

**number** - angle between the given two vectors

---

```javascript
Vector.areVectorsOrthogonal(vector1, vector2)
```

#### Parameters

- vector1 : **number[ ] | Vector** - the first vector 
- vector2 : **number[ ] | Vector** - the second vector 

#### Returns

**boolean** - true if they are orthogonal otherwise false

---

```javascript
Vector.areVectorOrthonormal(vector1, vector2)
```

#### Parameters

- vector1 : **number[ ] | Vector** - the first vector 
- vector2 : **number[ ] | Vector** - the second vector 

#### Returns

**boolean** -  true if they are orthonormal otherwise false

### Instance Methods


```javascript
.print()
```
Print the vector

---

```javascript
.getCopy()
```

#### Returns

**number[ ]** a copy the of vector

---

```javascript
.getNorm()
```

#### Returns

**number** the norm of a vector

---

```javascript
.scalarProduct(scalar)
```

Multiply the vector by the given scalar

#### Parameters

- scalar : **number** 

---

```javascript
.dotProduct(vector)
```

Multiply the vector by the given scalar

#### Parameters

- vector : **number[ ] | Vector** 

#### Returns

**number** the dot product of the vector and the given vector

---

```javascript
.crossProduct(vector)
```

Compute the cross product with the give 3D Vector

#### Parameters

- vector : **number[ ] | Vector** 

> **Note**: the vector must be 3d vectors

---

```javascript
.sum(vector)
```

Add the given vector to the vector

#### Parameters

- vector : **number[ ] | Vector** 

---

```javascript
.sub(vector)
```

Subtract the given vector to the vector

#### Parameters

- vector : **number[ ] | Vector** 

#### Example

```javascript
const vector1 = new Vector([1, 2, 1])
const vector2 = new Vector([0, 1, 3])
const vector3 = new Vector([2, 0, -1])

console.log(vector1.sum(vector2).sub(vector3).vector) // [-1, 3, 5]
```

---

```javascript
.euclideanDistance(vector)
```

#### Parameters

- vector : **number[ ] | Vector** 

#### Returns

**number** the euclidean distance between the two vectors

---

```javascript
.getAngle(vector, angleType)
```

#### Parameters

- vector : **number[ ] | Vector** 
- angleType: **string**  the type of angle to return: radians = "rad", degree ="deg", by default is "deg"

#### Returns

**number / object** angle between the vector and the given vector

#### Example

```javascript
const vector1 = new Vector([2, 3, 1])
const vector2 = new Vector([1, 1, 2])

console.log(vector1.getAngle(vector2, 'rad')) //0.7016741237876036
console.log(vector1.getAngle(vector2, 'deg')) //{ deg: 40, arcmin: 12, arcsec: 10 }
```

---

```javascript
.isVectorOrthogonal(vector)
```

#### Parameters

- vector : **number[ ] | Vector** 

#### Returns

**boolean** true if they are orthogonal otherwise false

---

```javascript
.isVectorOrthonormal(vector)
```

#### Parameters

- vector : **number[ ] | Vector** 

#### Returns

**boolean** true if they are orthonormal otherwise false
