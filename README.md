exp-less
===

Expansive plugin for Less files.

### To install:

    pak install exp-less

### Description

The exp-less extension compiles Less stylesheets to create composite CSS stylesheet.
The 'lessc' utility is used to process the Less files.

A map of file dependencies may be defined so that a master Less stylesheet will be rebuilt
by Expansive whenever an include stylesheet is updated. 

A 'stylesheet' option may specify a single output stylesheet that results from compiling all 
other Less stylesheets. If specified, the map of dependencies will be automatically created.

A 'documents' option may specify an array of Less files to compile. It may use negated 
patterns to exclude some files. By convention, exp-less expects the master Less stylesheet 
to be named with a '.css.less' extension and included Less files to use a simple '.less' 
extension. The default 'documents' option is set to ['!\*\* .less', '\*\*.css.less'] which will
process any '\*.css.less' files and exclude the simple '\*.less' files.

### To configure in expansive.json:

* compile-less-css.enable &mdash; Enable the compile-less-css service to process less files.
* compile-less-css.stylesheet &mdash; Primary stylesheet to update if any less file changes.
    If specified, the "dependencies" map will be automatically created.
* compile-less-css.dependencies &mdash; Explicit map of dependencies if not using "stylesheet".
* compile-less-css.documents &mdash; Array of less files to compile.

```
{
    services: {
        'compile-less-css': {
            enable: true,
            stylesheet: 'css/all.css',
            dependencies: { 'css/all.css.less' : '**.less' },
            documents: [ '!**.less', '**.css.less' ]
        }
    }
}
```

### Get Pak from

[https://embedthis.com/pak/](https://embedthis.com/pak/download.html)
