module.exports = function (grunt) {
    grunt.loadNpmTasks('grunt-menu');
    grunt.loadNpmTasks('grunt-contrib-uglify');
    grunt.loadNpmTasks('grunt-contrib-cssmin');
    grunt.loadNpmTasks('grunt-contrib-compress');
    grunt.loadNpmTasks('grunt-contrib-concat');
    grunt.loadNpmTasks('grunt-downloadfile');
    grunt.loadNpmTasks('grunt-zip');
    grunt.loadNpmTasks('grunt-contrib-copy');
    grunt.loadNpmTasks('grunt-replace-attribute');
    grunt.loadNpmTasks('grunt-comment-toggler');
    grunt.loadNpmTasks('grunt-bump');
    grunt.loadNpmTasks('grunt-exec');

    grunt.initConfig({
        pkg: grunt.file.readJSON("package.json"),
        bump: {
            options: {
                files: ['package.json'],
                updateConfigs: [],
                commit: false,
                createTag: false,
                push: false,
                globalReplace: false,
                prereleaseName: false,
                metadata: '',
                regExp: false
            }
        },
        nameProjectFiles: (function() {
            return "login"
        }()),
        nameProject: (function() {
            return "LOGIN"
        }()),
        dateCompiled: (function() {
            var date = new Date(),
                day = date.getDate(),
                month = date.getMonth() + 1,
                year = date.getFullYear(),
                hour = date.getHours(),
                mins = date.getMinutes(),
                secs = date.getSeconds();

            if (month < 10) {
                month = '0' + month;
            }
            if (day < 10) {
                day = '0' + day;
            }
            if (hour < 10) {
                hour = '0' + hour;
            }
            if (mins < 10) {
                mins = '0' + mins;
            }
            if (secs < 10) {
                secs = '0' + secs;
            }
            return `${year}${month}${day}${hour}${mins}${secs}`;
        }()),
        nameFile: (function() {
            return "compress_v<%= pkg.version %>.js"
        }()),
        nameFileCss: (function() {
            return "compress_v<%= pkg.version %>.css"
        }()),
        uglify: {
            bundle_and_minify: {
                options: {
                    // mangle: true,
                    compress:true,
                    // beautify:true,
                },
                files: {
                    "dist/<%= nameFile %>": [

							  "login-utils/loading.js", 
				"login-utils/msg.js",
				"login-app.callservices.js",
				"login-utils/translate-v2.js",
				"login-utils/utils.js",
				"login-controllers/bar-with-menu.js",
				"login-controllers/authorized.js",
				"login-controllers/register.js",
                "login-controllers/register-with-email.js",
				"login-controllers/login.js",
				"login-controllers/active.js",
				"login-controllers/expired-password.js",
				"login-controllers/request-recovery-password.js",
				"login-controllers/recovery-password.js",
				"login-controllers/resend-activation.js",
				"login-controllers/apps.js",	
				"login-controllers/rapid-pay.js",
				"login-controllers/voucher.js",
				"login-app.component.js",
				"login-app-router1.js",
				"login-app.module.js",
				"login-main.js"
                    ],
                }
            }
        },
        cssmin : {
            target : {
                src : [
                    "styles-v5.css"
                ],
                dest : "dist/<%= nameFileCss %>"
            },
        },
        copy: {
            preMoveFiles: {
                files : [
                    {
                        expand: true,
                        src: ['index4.js','app3.js','assets/**','views/**','app.component.html'],
                        dest: 'dist/',
                    },
                ]
            },
            moveFiles: {
                files : [
                    {
                        expand: true,
                        src: ['workbox-config-pre.js','workbox-config.js','service-worker.js', 'sw.js', 'sw.js.map', 'web-manifest.json'],
                        dest: 'dist/',
                    },
                ]
            }
        },
        replace_attribute: {
            remplaza_js: {
              options: {
                upsert: true,
                replace: {
                  '#principal_js': { src: '<%= nameFile %>' },
                  '#principal_css': { href: '<%= nameFileCss %>' }
                }
              },
              files: {
                  'dist/index.html': 'index.html'
              }
            }
        },
        compress: {
            main: {
                options: {
                    archive: 'zip/<%= nameProject %>_<%= dateCompiled %>.zip',
                    mode: 'zip'
                },
                files: [   
                    {src: ['dist/**']},
                ]
            }
        },
        exec: {
            execute_command: {
              cmd: 'workbox generateSW workbox-config-pre.js'
            },
            execute_command2: {
              cmd: 'workbox injectManifest'
            },
        },
        toggleComments: {
            customOptions: {
                options: {
                    padding: 4,
                    removeCommands: true
                },
                files: {"dist/index.html": "dist/index.html"}
            }
        }
    })
    grunt.registerTask("subir", ["bump"]);
    grunt.registerTask("production_", ["bump", "uglify:bundle_and_minify", "cssmin:target", "copy:preMoveFiles", "exec:execute_command", "exec:execute_command2", "copy:moveFiles", "replace_attribute:remplaza_js", "toggleComments"]);
    grunt.registerTask("production", ["bump", "uglify:bundle_and_minify", "cssmin:target", "copy:preMoveFiles", "exec:execute_command", "exec:execute_command2", "copy:moveFiles", "replace_attribute:remplaza_js", "toggleComments", "compress:main"]);
}    
