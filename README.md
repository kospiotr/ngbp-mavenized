# ngbp-mavenized

## Motivation##

Quick bootstrap web layer for multimodule Maven project following best practices from ngBoilerplate.

## Changes comparing to: https://github.com/ngbp/ngbp##

- Maven as a node, npm, grunt executr and target resource vendor
- https://github.com/eirslett/frontend-maven-plugin as a runtime installer for node, npm and bower.
- Added grunt-cli and bower as a development dependencies.
- Replaced firefox karma launcher with phantomjs luncher in order to make it running indepently from installed browsers.
- Added development server based on express, launched pharallely with watch to host page with livereload.

## Diff

Commands:
* `npm install --save-dev bower grunt-cli karma-phantomjs-launcher express grunt-express-server grunt-parallel`
* `npm uninstall --save-dev karma-firefox-launcher`

New files: 
* `/home/kospiotr/Projects/ngbp-mavenized/build.sh`
* `/home/kospiotr/Projects/ngbp-mavenized/dev.sh`
* `/home/kospiotr/Projects/ngbp-mavenized/pom.xml`
* `/home/kospiotr/Projects/ngbp-mavenized/prod.sh` 

Modified:

**Gruntfile.js**:

New task plugins:

```
    grunt.loadNpmTasks('grunt-express-server');
    grunt.loadNpmTasks('grunt-parallel');
```

Configuration:

```
        express: {
            dev: {
                options: {
                    script: 'dev-server.js',
                    debug: true,
                    background: false
                }
            },
            prod: {
                options: {
                    script: 'dev-server.js',
                    background: false
                }
            }
        },
        parallel: {
            livereload_dev_server: {
                options: {
                    grunt: true,
                    stream: true
                },
                tasks: ['express', 'watch']
            }
        }
```

Tasks:

```
    /**
     * Development mode which runs parallely watch and reverse proxy server.
     */
    grunt.registerTask('dev', 'For building and serving development build and livereload purposes', function () {
        grunt.option('src-build', true);
        grunt.task.run([
            'parallel:livereload_dev_server'
        ]);
    });

    /**
     * Production preview mode which builds builds project and host it on the server.
     */
    grunt.registerTask('prod', 'For building and serving production build purposes', function () {
        grunt.option('src-bin', true);
        grunt.task.run([
            'default', 'express:dev'
        ]);
    });
```

**Karma config**

```
    plugins: [ 'karma-jasmine', 'karma-phantomjs-launcher', 'karma-coffee-preprocessor' ],

    browsers: [
      'PhantomJS'
    ]
```




## How to use it

* To build, run: ```mvn clean install```
* For development mode run: ```mvn clean package -Pdev``` and then open: http://localhost:3000 with livereload extension installed in your browser: http://livereload.com/extensions/. Any change in the source files effets in reloaded page.
