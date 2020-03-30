## Modules

<dl>
<dt><a href="#module_tokenize">tokenize</a></dt>
<dd><p>A module for tokenizing PHP code.</p>
</dd>
</dl>

## Typedefs

<dl>
<dt><a href="#NamespaceRule">NamespaceRule</a> : <code>Object</code></dt>
<dd></dd>
<dt><a href="#checkFiles">checkFiles</a> : <code>function</code></dt>
<dd><p>Rule funtion to check the file tree</p>
</dd>
<dt><a href="#namespaseReport">namespaseReport</a> : <code>function</code></dt>
<dd><p>This callback is called by rule to log an error in files tree</p>
</dd>
<dt><a href="#Rule">Rule</a> : <code>Object</code></dt>
<dd></dd>
<dt><a href="#check">check</a> : <code>function</code></dt>
<dd><p>Rule funtion to check the file tree</p>
</dd>
<dt><a href="#report">report</a> : <code>function</code></dt>
<dd><p>This callback is called by rule to log an error</p>
</dd>
</dl>

<a name="module_tokenize"></a>

## tokenize
A module for tokenizing PHP code.


* [tokenize](#module_tokenize)
    * [~Tokens](#module_tokenize..Tokens)
        * [.isCode()](#module_tokenize..Tokens+isCode) ⇒ <code>Boolean</code>
        * [.step([backward], [includeAll])](#module_tokenize..Tokens+step) ⇒ <code>this</code>
        * [.matches(strings)](#module_tokenize..Tokens+matches) ⇒ <code>Boolean</code>
        * [.stepTo(strings)](#module_tokenize..Tokens+stepTo) ⇒ <code>this</code>
        * [.stepToClosing()](#module_tokenize..Tokens+stepToClosing) ⇒ <code>this</code>
        * [.body()](#module_tokenize..Tokens+body) ⇒ <code>string</code>
        * [.type()](#module_tokenize..Tokens+type) ⇒ <code>string</code>
        * [.current()](#module_tokenize..Tokens+current) ⇒ <code>Token</code>
        * [.matchAll(strings, callback)](#module_tokenize..Tokens+matchAll)
    * [~types](#module_tokenize..types) : <code>enum</code>
    * [~Token](#module_tokenize..Token) : <code>object</code>
    * [~tockensCallback](#module_tokenize..tockensCallback) : <code>function</code>

<a name="module_tokenize..Tokens"></a>

### tokenize~Tokens
Class for navigation over array tokens

**Kind**: inner class of [<code>tokenize</code>](#module_tokenize)  

* [~Tokens](#module_tokenize..Tokens)
    * [.isCode()](#module_tokenize..Tokens+isCode) ⇒ <code>Boolean</code>
    * [.step([backward], [includeAll])](#module_tokenize..Tokens+step) ⇒ <code>this</code>
    * [.matches(strings)](#module_tokenize..Tokens+matches) ⇒ <code>Boolean</code>
    * [.stepTo(strings)](#module_tokenize..Tokens+stepTo) ⇒ <code>this</code>
    * [.stepToClosing()](#module_tokenize..Tokens+stepToClosing) ⇒ <code>this</code>
    * [.body()](#module_tokenize..Tokens+body) ⇒ <code>string</code>
    * [.type()](#module_tokenize..Tokens+type) ⇒ <code>string</code>
    * [.current()](#module_tokenize..Tokens+current) ⇒ <code>Token</code>
    * [.matchAll(strings, callback)](#module_tokenize..Tokens+matchAll)

<a name="module_tokenize..Tokens+isCode"></a>

#### tokens.isCode() ⇒ <code>Boolean</code>
Is current token a code (not whitespace and comment)

**Kind**: instance method of [<code>Tokens</code>](#module_tokenize..Tokens)  
<a name="module_tokenize..Tokens+step"></a>

#### tokens.step([backward], [includeAll]) ⇒ <code>this</code>
Moves current position

**Kind**: instance method of [<code>Tokens</code>](#module_tokenize..Tokens)  

| Param | Type | Description |
| --- | --- | --- |
| [backward] | <code>Boolean</code> | move backward |
| [includeAll] | <code>Boolean</code> | include comments and whitespace |

<a name="module_tokenize..Tokens+matches"></a>

#### tokens.matches(strings) ⇒ <code>Boolean</code>
Check if current body matches string
or array of strings

**Kind**: instance method of [<code>Tokens</code>](#module_tokenize..Tokens)  

| Param | Type |
| --- | --- |
| strings | <code>string</code> \| <code>Array.&lt;string&gt;</code> | 

<a name="module_tokenize..Tokens+stepTo"></a>

#### tokens.stepTo(strings) ⇒ <code>this</code>
Steps to next occutance of strings

**Kind**: instance method of [<code>Tokens</code>](#module_tokenize..Tokens)  

| Param | Type |
| --- | --- |
| strings | <code>string</code> \| <code>Array.&lt;string&gt;</code> | 

<a name="module_tokenize..Tokens+stepToClosing"></a>

#### tokens.stepToClosing() ⇒ <code>this</code>
Steps to correct closing brace

**Kind**: instance method of [<code>Tokens</code>](#module_tokenize..Tokens)  
<a name="module_tokenize..Tokens+body"></a>

#### tokens.body() ⇒ <code>string</code>
Returns current token body

**Kind**: instance method of [<code>Tokens</code>](#module_tokenize..Tokens)  
<a name="module_tokenize..Tokens+type"></a>

#### tokens.type() ⇒ <code>string</code>
Returns current token type

**Kind**: instance method of [<code>Tokens</code>](#module_tokenize..Tokens)  
<a name="module_tokenize..Tokens+current"></a>

#### tokens.current() ⇒ <code>Token</code>
Returns current token

**Kind**: instance method of [<code>Tokens</code>](#module_tokenize..Tokens)  
<a name="module_tokenize..Tokens+matchAll"></a>

#### tokens.matchAll(strings, callback)
Match all occurances of string or array of
string

**Kind**: instance method of [<code>Tokens</code>](#module_tokenize..Tokens)  

| Param | Type | Description |
| --- | --- | --- |
| strings | <code>string</code> \| <code>Array.&lt;string&gt;</code> |  |
| callback | <code>tockensCallback</code> | function |

<a name="module_tokenize..types"></a>

### tokenize~types : <code>enum</code>
Token types enum.

**Kind**: inner enum of [<code>tokenize</code>](#module_tokenize)  
**Read only**: true  
**Properties**

| Name | Type | Default |
| --- | --- | --- |
| whitespace | <code>number</code> | <code>0</code> | 
| comment | <code>number</code> | <code>1</code> | 
| label | <code>number</code> | <code>2</code> | 
| variable | <code>number</code> | <code>3</code> | 
| other | <code>number</code> | <code>4</code> | 
| bracket | <code>number</code> | <code>5</code> | 
| eof | <code>number</code> | <code>6</code> | 

<a name="module_tokenize..Token"></a>

### tokenize~Token : <code>object</code>
**Kind**: inner typedef of [<code>tokenize</code>](#module_tokenize)  
**Properties**

| Name | Type | Description |
| --- | --- | --- |
| type | <code>string</code> | token type |
| body | <code>string</code> | token body |
| line | <code>number</code> | token line |
| column | <code>number</code> | token column |

<a name="module_tokenize..tockensCallback"></a>

### tokenize~tockensCallback : <code>function</code>
This callback is called by matchAll and for Each

**Kind**: inner typedef of [<code>tokenize</code>](#module_tokenize)  

| Param | Type |
| --- | --- |
| tokens | <code>Tokens</code> | 

<a name="NamespaceRule"></a>

## NamespaceRule : <code>Object</code>
**Kind**: global typedef  
**Properties**

| Name | Type | Description |
| --- | --- | --- |
| checkFiles | [<code>checkFiles</code>](#checkFiles) | function to check |

<a name="checkFiles"></a>

## checkFiles : <code>function</code>
Rule funtion to check the file tree

**Kind**: global typedef  

| Param | Type | Description |
| --- | --- | --- |
| options | <code>\*</code> | passed from config file |
| files | <code>Array.&lt;Array.&lt;string&gt;&gt;</code> | tree |
| report | [<code>namespaseReport</code>](#namespaseReport) | error callback |

<a name="namespaseReport"></a>

## namespaseReport : <code>function</code>
This callback is called by rule to log an error in files tree

**Kind**: global typedef  

| Param | Type | Description |
| --- | --- | --- |
| path | <code>string</code> | where error occured |
| messege | <code>string</code> |  |

<a name="Rule"></a>

## Rule : <code>Object</code>
**Kind**: global typedef  
**Properties**

| Name | Type | Description |
| --- | --- | --- |
| check | [<code>check</code>](#check) | tokens stream for errors |

<a name="check"></a>

## check : <code>function</code>
Rule funtion to check the file tree

**Kind**: global typedef  

| Param | Type | Description |
| --- | --- | --- |
| options | <code>\*</code> | passed from config file |
| tokens | <code>tokenize~Tokens</code> |  |
| report | [<code>report</code>](#report) | error callback |

<a name="report"></a>

## report : <code>function</code>
This callback is called by rule to log an error

**Kind**: global typedef  

| Param | Type | Description |
| --- | --- | --- |
| messege | <code>string</code> |  |
| token | <code>tokenize~Token</code> | where error occured |

