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
vector : **number[]** - the array the represent the vector

## Attributes

```javascript
.vector : number[]
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

**number[]** - an empty vector of the given dimension

---

```javascript
Vector.createRandomVector(dim, min, max)
```

#### Parameters

- dim : **number** - the dimension of the vector
- min : **number** - the min number of the random range
- max : **number** - the max number of the random range
#### Returns

**number[]** - an vector of the given dimension filled with random number in the given range

---

```javascript
Vector.print(vector)
```
Print the given vector

#### Parameters

- vector : **number[] | Vector** - the vector to print

---

```javascript
Vector.getCopy(vector)
```

#### Parameters

- vector : **number[] | Vector** - the vector to copy

#### Returns

**number[]** - the copy of the given vector

---

```javascript
Vector.getNorm(vector)
```

#### Parameters

- vector : **number[] | Vector** - the vector

#### Returns

**number** - the norm of the given vector

---

```javascript
Vector.scalarProduct(vector, scalar)
```

#### Parameters

- vector : **number[] | Vector** - the vector
- scalar : **number** - scalar to  

#### Returns

**number[]** - the vector multiplied by the scalar

---

```javascript
Vector.dotProduct(vector1, vector2)
```

#### Parameters

- vector1 : **number[] | Vector** - the first vector of the dot product
- vector2 : **number[] | Vector** - the second vector of the dot product

#### Returns

**number** - the dot between the two vectors

---

```javascript
Vector.crossProduct(vector1, vector2)
```

**Note**: the two vectors must be 3d vector

#### Parameters

- vector1 : **number[] | Vector** - the first vector of the cross product
- vector2 : **number[] | Vector** - the second vector of the cross product

#### Returns

**number[]** - the cross product between the two vectors

---

#### Vector Operation - Sum

```javascript
Vector.sum(vector1, vector2)
```

#### Parameters

- vector1 : **number[] | Vector** - the first vector of the sum
- vector2 : **number[] | Vector** - the second vector of the sum

#### Returns

**number[]** - The sum of the two vectors

---

#### Vector Operation - Sum

```javascript
Vector.sub(vector1, vector2)
```

#### Parameters

- vector1 : **number[] | Vector** - the first vector of the subtraction
- vector2 : **number[] | Vector** - the second vector of the subtraction

#### Returns

**number[]** - The subtraction of the two vectors (vector1 - vector2)

---

```javascript
Vector.euclideanDistance(vector1, vector2)
```

#### Parameters

- vector1 : **number[] | Vector** - the first vector 
- vector2 : **number[] | Vector** - the second vector 

#### Returns

**number[]** - he euclidean distance between the two vectors

---

```javascript
Vector.getAngle(vector1, vector2, angleType='deg')
```

#### Parameters

- vector1 : **number[] | Vector** - the first vector 
- vector2 : **number[] | Vector** - the second vector 
- angleType : **string** - angleType the type of angle to return: radians = "rad", degree ="deg", by default is 'deg'

#### Returns

**number** - angle between the given two vectors

---

```javascript
Vector.areVectorsOrthogonal(vector1, vector2)
```

#### Parameters

- vector1 : **number[] | Vector** - the first vector 
- vector2 : **number[] | Vector** - the second vector 

#### Returns

**boolean** - true if they are orthogonal otherwise false

---

```javascript
Vector.areVectorOrthonormal(vector1, vector2)
```

#### Parameters

- vector1 : **number[] | Vector** - the first vector 
- vector2 : **number[] | Vector** - the second vector 

#### Returns

**boolean** -  true if they are orthonormal otherwise false

### Instance Methods
