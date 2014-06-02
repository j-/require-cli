require-cli
===========

Evaluate a JavaScript expression on the command line. Like `node -e` but loads a module for you to work with.

## Installing

### Command line

```bash
$ npm install --global git://github.com/j-/require-cli
```

The binary `require` will now be available.

### Node module

```bash
$ npm install --save git://github.com/j-/require-cli
```

The module can now be loaded with `require('require-cli')`.

## Usage

### Command line

    Usage:
        require <module> [<expression>...]
    
    Options:
        -h, --help      Show this screen
        -V, --version   Show version

**module** can be:
* a native module, like `path`, `http` etc., or
* a dependency of the project at the current working directory (for example: `express` will try to load `./node_modules/express` -- like calling `require()`), or
* a relative path to a module definition, or
* an absolute path to a module definition

**expression** will be evaluated, similar to `eval()`. Can contain function calls. The result of the last evaluated expression will be returned.

#### Examples

```bash
$ require console "log(123)"
123
undefined

$ require os "platform()"
win32

$ require path sep
\

$ require ./package version
1.2.3
```

### Node module

`require-cli` can also be included into any project as a node module via `require` and exports only a single function.

#### eval()

**Syntax**: `eval(modulePath, expression[, cwd])`
* _modulePath_: Described above, can be a module name or path. Follows the same rules as node's `require()`.
* _expression_: JavaScript expression to evaluate.
* _cwd_ (optional): Directory to load module paths relative to. Will default to `process.cwd()`.

## License

[MIT](LICENSE).
