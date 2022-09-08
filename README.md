<h1 align="center" id="title">React Secure Data</h1>

<p align="center"><img src="https://cdn-icons-png.flaticon.com/512/463/463662.png" alt="project-image"></p>

<p id="description">react-data-secure takes care of storing the local storage data securely by encrypting all the data (basically it is a wrapper written over the default localStorage to write the data securely to the localStorage) and storing it in memory this for faster reading. </p>
<p id="description2">The key is generated using the browser fingerprint which is generated using more than 10 browser key identifiers and the secure key entered by the user.</p>
<p id="description2">The user specific secure key can be configured using the .env file as <strong>SECURE_DATA_HASH_KEY=xxxxxxxxxxxxxxxx</strong> or <strong>REACT_APP_SECURE_DATA_HASH_KEY=xxxxxxxxx</strong></p>

<p>In addition, react-secure-data storage preserves the data format for each data type, as it supports the following data types. 

<strong>String | Object | Object | Number | Boolean</strong>
</p>


<h2>🛠️ Installation Steps:</h2>

<p>1. Install with npm</p>

```
npm i react-secure-data
```

<p>2. Install with yarn</p>

```
yarn add react-secure-data
```

<p>3. Import</p>

```
import secureData as SD from 'react-secure-data'
```

|         Function       |Usecase                          | Datatype                         |
|----------------|-------------------------------|-----------------------------|
|`setItem(key, value)` |To set values to secure storage            |Supports `'String - Object - Number - Boolean'` as value            |
|`getItem(key)`        |To get values which is saved on secure local storage           | Return null if the key does not exits           |
|`removeItem(key)`          | To remove specified key from secure local storage|  |
|`clear()`          | Removed all data from secure local storage|  |