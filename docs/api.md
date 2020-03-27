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
</dl>

<a name="module_tokenize"></a>

## tokenize
A module for tokenizing PHP code.


* [tokenize](#module_tokenize)
    * [~Tokens](#module_tokenize..Tokens)
        * [.isCode()](#module_tokenize..Tokens+isCode) ⇒ <code>Boolean</code>
        * [.step([backward], [includeAll])](#module_tokenize..Tokens+step)
        * [.body()](#module_tokenize..Tokens+body) ⇒ <code>string</code>
        * [.type()](#module_tokenize..Tokens+type) ⇒ <code>string</code>
        * [.current()](#module_tokenize..Tokens+current) ⇒ <code>Token</code>
    * [~types](#module_tokenize..types) : <code>enum</code>
    * [~Token](#module_tokenize..Token) : <code>object</code>

<a name="module_tokenize..Tokens"></a>

### tokenize~Tokens
Class for navigation over array tokens

**Kind**: inner class of [<code>tokenize</code>](#module_tokenize)  

* [~Tokens](#module_tokenize..Tokens)
    * [.isCode()](#module_tokenize..Tokens+isCode) ⇒ <code>Boolean</code>
    * [.step([backward], [includeAll])](#module_tokenize..Tokens+step)
    * [.body()](#module_tokenize..Tokens+body) ⇒ <code>string</code>
    * [.type()](#module_tokenize..Tokens+type) ⇒ <code>string</code>
    * [.current()](#module_tokenize..Tokens+current) ⇒ <code>Token</code>

<a name="module_tokenize..Tokens+isCode"></a>

#### tokens.isCode() ⇒ <code>Boolean</code>
Is current token a code (not whitespace adn comment)

**Kind**: instance method of [<code>Tokens</code>](#module_tokenize..Tokens)  
<a name="module_tokenize..Tokens+step"></a>

#### tokens.step([backward], [includeAll])
Moves current position

**Kind**: instance method of [<code>Tokens</code>](#module_tokenize..Tokens)  

| Param | Type | Description |
| --- | --- | --- |
| [backward] | <code>Boolean</code> | move backward |
| [includeAll] | <code>Boolean</code> | include comments and whotespace |

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
<a name="module_tokenize..types"></a>

### tokenize~types : <code>enum</code>
Token types enum.

**Kind**: inner enum of [<code>tokenize</code>](#module_tokenize)  
**Read only**: true  
**Properties**

| Name | Type | Default |
| --- | --- | --- |
| whitespace | <code>string</code> | <code>&quot;whitespace&quot;</code> | 
| comment | <code>string</code> | <code>&quot;comment&quot;</code> | 
| label | <code>string</code> | <code>&quot;label&quot;</code> | 
| variable | <code>string</code> | <code>&quot;variable&quot;</code> | 
| other | <code>string</code> | <code>&quot;other&quot;</code> | 
| bracket | <code>string</code> | <code>&quot;bracket&quot;</code> | 
| eof | <code>string</code> | <code>&quot;eof&quot;</code> | 

<a name="module_tokenize..Token"></a>

### tokenize~Token : <code>object</code>
**Kind**: inner typedef of [<code>tokenize</code>](#module_tokenize)  
**Properties**

| Name | Type | Description |
| --- | --- | --- |
| type | <code>string</code> | token type. |
| body | <code>string</code> | token body. |

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
| report | <code>namespaseReport</code> | error callback |

