# Работа с gulp #

Gulp - утилита `Node.js`, представляющая из себя систему описания произвольного вида задач.

Задачи могут быть реализованы подключением дополнительных модулей - плагинов. Они могут выполнять разную работу: минификацию файлов проекта, перемещение документов, сборку проекта, развертывание и т.д.

* **Streaming build system** - потоковая система сборки
* **gulpfile.js** - Файл конфигурации gulp описывает подключение плагинов, произвольные задачи, комбинирование действий.
* **VynilFS** - файловая система, используется для описания объектов, которыми являются файлы передаваемые в поток Node.js. 

> Gulp использует потоки и VynilFS. Файлы считываются из директории из и направляются в поток в виде объектов VynilFS. Причем обработка файлов в потоке происходит сразу, при этом еще не все файлы директории могут быть загружены в поток - свойство **параллелизма**.

**Преимущества**:

- поточная архитектура передачи фалов по цепочке
- вычисления производятся в памяти без промежуточной записи на диск
- параллелизм
- не всегда можно считывать содержимое файла
- простая конфигурация



### 1. Установка Gulp 4 и плагинов

**1.1 Установка окружения**

Для работы с gulp вам потребуется установить Node.js и систему контроля версий git.

* [node.js](https://nodejs.org/en/)
* [git](https://git-scm.com/)

Проверить наличие установленных версий node.js и git на своём компьютере вы можете при помощи команд:

```Bash
git -v
node -v

```

**1.2 Подготовка окружения**

В операционной системе Windows при многопользовательском режиме и отсутсвии прав администратора могут возникнуть проблемы с переменными окружения. Для корректной работы node.js в системе должны быть указаны переменные окружения `NODE_PATH` и  `PATH`.
Для Windows необходимо будет изменить переменные окружения, для того, чтобы из консоли можно было под разными пользователями запускать команды.

Вы можете создать файл `env.bat` и записать в него следующий код:

```
setx NODE_PATH %AppData%\npm\node_modules
setx PATH %AppData%\npm

```

> Для аккаунта каждого пользователя Windows есть своя папка `AppData`. Она хранит данные именно того пользователя в папке которого находится. Это даёт возможность программам и приложениям Windows хранить несколько вариантов настроек на компьютере, который одновременно используется несколькими пользователями.

> Скрипт создает две переменные окружения, используя системную переменную `%AppData%`, таким образом, для каждого пользователя будет свой путь до директории с настройками.

Сохраните получившийся файл `env.bat` и запустите его - двойным кликом по файлу.
После успешного запуска переменные окружения будут добавлены в вашу систему.


**1.3 Глобальная установка gulp-cli**

Для того, чтобы команда gulp была доступна из консоли необходимо произвести глобальную установку gulp-cli, используя npm – менеджер пакетов Node.js.

Npm устанавливается автоматически с Node.js, так как он является основным средством установки пакетов Node.js.

Чтобы проверить версию npm, выполните команду:

```Bash
npm -v

```

**Установка gulp-cli**

```Bash
npm i -g gulp-cli

```
- ключ `i` - короткая запись команды `install`
- ключ `-g` - установить пакет глобально на компьютер, чтобы к нему можно было обращаться из любой директории
- `gulp-cli` - пакет работы с gulp для консоли

После успешного выполнения команды вы можете проверить работу команды gulp:

```Bash
gulp -v

```
Результатом будет сообщение (номера версии могут отличаться):

```
CLI version: 2.2.0
Local version: Unknown

```
- `CLI version: 2.2.0` - осзначает, что gulp для консоли установлен и версия его 2.2.0
- `Local version` - говорит о наличии установленной локальной версии gulp в текущей директории. Сейчас пока значение `Unknown`, так как локальная установка еще не выполнялась.
Её нужно делать в директории вашего проекта. Который вы пока не создали.


### 2. Создание нового проекта

Создайте на вашем компьютере каталог в котором будет находиться ваш проект.
Например, `project-gulp`.

Вы можете использовать команды:

- `cd` -  для перехода между директориями
- `dir`(для windows) - просмотр содержимого директории
- `ls`(аналог dir для Unix - систем)
-  `mkdir` - создание нового каталога

Вы можете так же создать директорию обычными средствами управления в графической оболочке операционной системы, пользуясь мышкой, клавиатурой и проводником файлов системы.

Перейдите в директорию проекта через консоль (путь до директории может отличаться).

```Bash
cd Code_Repository/project-gulp

```

#### 2.1 Создание проекта и файла конфигурации для node
Находясь в корневой директории вашего проекта выполните команду:

```Bash
git init

```
Это инициализирует в ней локальный репозиторий git.

Далее создайте файл исключений для вашего репозитория со следующим содержанием и назовите его `.gitignore`:

```
# Ignore system files
.DS_Store
Thumbs.db
desktop.ini

# Ignore PHPStorm settings folder
.idea/

# Ignore installed nodejs modules folder and package-lock.json
node_modules/
package-lock.json


```

Далее выполните команду инициализации нового проекта node:

```Bash
npm init

```
Выполните пошаговую настройку проекта, отвечая на вопросы утилиты:

> Вы можете просто нажимать `Enter` и значения будут предложены автоматически. Или Вы можете их изменить самостоятельно.

```
package name: (project-gulp) 
version: (1.0.0) 
description: 
entry point: (index.js) 
test command: 
git repository: 
keywords: 
author: 
license: (ISC) 

```

- **package name: (project-gulp)** - название вашего проекта
- **version: (1.0.0)** - версия вашего проекта
- **description:** - описание вашего проекта на английском языке
- **entry point: (index.js)** - основной обработчик (стартовый файл запуска вашего приложения)
- **test command:** - название команды для тестирования проекта
- **git repository:** - удаленный репозиторий проекта (заполнен автоматически если у вас задан git remote)
- **keywords:** - ключевые слова
- **author:** - автор проекта
- **license: (ISC)** - лицензия по которой может распространяться проект
- **Is this OK?** - Согласиться с описанными выше настройками (yes/no)

> По результатам выполнения команды `npm init` будет сформирован в корне проекта файл `package.json`

### 3. Установка модулей

Установка любого модуля или библиотеки средствами `npm` возможна при помощи команды:

```Bash
npm install [название_пакета] --save-dev

```

Сокращенная версия этой команды:

```Bash
npm i [название_пакета] -D

```

Можно устанавливать сразу несколько пакетов:

```Bash
npm i [название_пакета_1] [название_пакета_2] [название_пакета_N] -D

```

Подробное описание пакетов, плагинов и их поиск можно смотреть на сайте:

[https://www.npmjs.com](https://www.npmjs.com/)


#### 3.1 Установка gulp локально для вашего проекта 

Выполните команду:

```Bash
npm i gulp -D

```
После успешного выполнения команды вы можете проверить версию gulp:

```Bash
gulp -v

```
Результатом будет сообщение (номера версии могут отличаться):

```Bash
CLI version: 2.2.0
Local version: 4.0.2

```

`Local version: 4.0.2` - версия локального gulp для вашего проекта


#### 3.2 Создание конфигурационного файла gulp для вашего проекта

В корневой директории вашего проекта создайте файл `gulpfile.js`.

Конфигурационный файл обычно состит из нескольких секций, для удобства использования и изменения для разных проектов рекомендуется придерживаться этого подхода.

Пример структуры: `gulpfile.js`

```js
'use strict';

/*************************************
 * Plugins section
 ************************************/

const gulp = require('gulp');

/*************************************
 * Parameters section
 ************************************/

var path = {
        build: { // пути для сборки проектов
            html:'./',
            scss: 'css/',
        },
        src: { // пути размещения исходных файлов проекта
            html:'src/*.html',
            scss: 'src/scss/main.scss',
        },
        watch: { // пути файлов, за изменением которых мы хотим наблюдать
            html: 'src/*.html',
            scss: 'src/scss/**/*.scss',
        },
        clean: 'css', // путь очистки директории для сборки

    };
    

/***********************
 * Tasks
 ***********************/

gulp.task('prod:html',function(done){
    gulp.src(path.src.html)
        .pipe(htmlmin({ collapseWhitespace: true }))
        .pipe(gulp.dest(path.build.html));
    done();
});


/***********************
 * Run watchers
 ***********************/

gulp.task('watch',function (done) {
    gulp.watch(path.watch.html, gulp.series('dev:html'));
    done();
});


gulp.task('default', gulp.series('prod:html','watch'));


```

#### 3.3 Логика конфигурационного файла

- секция установленных плагинов
- секция переменных с настройками проекта
- секция описания задач
- секция запуска задач отслеживания изменений в файлах проекта (`watch`)
- секция запуска последовательности задач и задачи по умолчанию (`default`)

Для проверки правильности описания задач вы можете вызвать команду:

```Bash
 gulp --tasks

```

Эта команда в графическом виде представляет список задач и последовательность их выполнения.

Пример вывода последовательности задач в результате выполнения команды `gulp --tasks`:

```Bash
[13:55:25] Tasks for ~/Code_Repository/project/gulpfile.js
[13:55:25] ├── clean
[13:55:25] ├── dev:html
[13:55:25] ├── dev:scss
[13:55:25] ├── prod:html
[13:55:25] ├── prod:scss
[13:55:25] ├── webserver
[13:55:25] ├── watch
[13:55:25] ├─┬ dev
[13:55:25] │ └─┬ <series>
[13:55:25] │   ├─┬ <parallel>
[13:55:25] │   │ ├── dev:html
[13:55:25] │   │ └── dev:scss
[13:55:25] │   ├── watch
[13:55:25] │   └── webserver
[13:55:25] ├─┬ prod
[13:55:25] │ └─┬ <parallel>
[13:55:25] │   ├── dev:html
[13:55:25] │   └── prod:scss
[13:55:25] └─┬ default
[13:55:25]   └─┬ <series>
[13:55:25]     └─┬ dev
[13:55:25]       └─┬ <series>
[13:55:25]         ├─┬ <parallel>
[13:55:25]         │ ├── dev:html
[13:55:25]         │ └── dev:scss
[13:55:25]         ├── watch
[13:55:25]         └── webserver

```

- `<series>` - обозначает последовательно выполняемые задачи
-  `<parallel>` - обозначает параллельно выполняемые задачи

-

#### 3.4 Логика последовательности выполнения задач

При описании задач вы формируете алгоритм по которому будут выполняться определенные действия. Порядок этих действий важен. Некоторые из них вы можете выполнять одновременно - `<parallel>`, а некоторые требуют жесткой последовательности - `<series>`.

Gulp выполняет все задачи по умолчанию **асинхронно**, время готовности у них разное, поэтому нужно понимать что запускать по порядку, а что только после получения сигнала выполнения предыдущих действий.

Например, Вы запустили одновременно задачу *компиляции SCSS-стилей* и *удаление устаревших файлов* из каталога css, в который стили помещает SCSS-компилятор. Так как задачи выполняются по умолчанию *асинхронно*, произойдет одновременное выполнение и *компиляции*, и *удаления*. В итоге, результаты компиляции могут быть удалены. Но, если вы выстроите последовательное выполнение `<series>`: вначале *удаления*, а затем *компиляции* у вас не будет никаких проблем.

С другой стороны, Вы можете независимо выполнять *задачу компиляции SCSS-стилей* и, например, *минимизации HTML-разметки*. В этом случае, разумно использовать распараллеливание задач `<parallel>` для экономии времени.

-

#### 3.5 Создание простейшей задачи

```js
'use strict';

const gulp = require('gulp');

gulp.task('test', function(){
	console.log('test task');
});

```
-
**Вариант без аргумента task - в виде функции:**

> Сложен для вызова, так как нельзя использовать зарезервированные имена для функций, например `'default'`
>
> Не рекомендуется использовать данный способ - есть ограничения:

```js
'use strict';

const gulp = require('gulp');

function test(callback_name){
	console.log('test task');
	callback_name();
}

gulp.task('default',test);

```
-

#### 3.5.1 Запуск простейшей задачи 

```Bash
gulp test

```
**Результат выполнения задачи:**

```Bash
[14:51:29] Using gulpfile ~/Code_Repository/project-gulp/gulpfile.js
[14:51:29] Starting 'test'...
test task
[14:51:29] The following tasks did not complete: test
[14:51:29] Did you forget to signal async completion?

```

> Так как все задачи выполняются асинхронно, каждая задача должна сигнализировать о завершении

-

#### 3.6 Способы сигнала завершения задачи 

- использование **callback**:

> Задача не возвращает никакого результата на выходе, callback_name служит просто сигналом завершения выполнения

```js
'use strict';

const gulp = require('gulp');

gulp.task('test', function(callback_name){
	console.log('test task');
	callback_name();
});

```

- использование **promise**:

>  

```js
'use strict';

const gulp = require('gulp');

gulp.task('test:promise', function(){
	return new Promise((resolve, reject) => {
		console.log('test promise');
	resolve('result');
	});
});

```

- использование **создания нового потока stream**:

```js
'use strict';

const gulp = require('gulp');

gulp.task('test:stream', function(){
    //creates nodejs stream and done(and throws data away)
    console.log('test stream');
    return require('fs').createReadStream(__filename);
});

```

>  Gulp не позволяет передавать данные между задачами. Он "читает" содержимое потока и завершается. Никакое содержимое нельзя вернуть при помощи return

[Описание потоков Node.js](https://nodejs.org/api/stream.html#stream_stream)

- задача **порождает дочерний процесс**:

```js
'use strict';

const gulp = require('gulp');

gulp.task('test:process', function(){
    //return child process
    return require('child_process').spawn('ls', ['.'], {stdio: 'inherit'});
});

```

>  `child_process.spawn` запускает новый процесс `'ls'` с помощью заданной команды

> `['.']` - корневая директория проекта

>  `stdio (Array)` — строка конфигурации stdio дочернего процесса `'ls'`

-

### 4 VynilFS 

> Vinyl это очень простой объект метаданных, который описывает файл. Когда вы думаете о файле, на ум приходят два атрибута: путь `path` и содержимое `contents`.
>
> Это основные атрибуты Vinyl-объекта. Файл не обязательно представляет что-то в файловой системе вашего компьютера. У вас есть файлы на S3, FTP, Dropbox, Box, CloudThingly.io и других сервисах. Vinyl может быть использован для описания файлов из всех этих источников.

Gulp  использует для своей работы модуль Node.js `'vinyl-fs'`.

Документация по модулям:

- [https://github.com/gulpjs/vinyl](https://github.com/gulpjs/vinyl)

- [https://github.com/gulpjs/vinyl-fs](https://github.com/gulpjs/vinyl-fs)



Пример `gulpfile.js` для вывода атрибутов объекта VynilFS

```js
'use strict';

const gulp = require('gulp');

gulp.task('default', function() {
  return gulp.src('src/**/*.*')
      .on('data', function(file) {
     	// every nodejs stream has a `data` event, so we can make a callback
        console.log({
          contents: file.contents,
          path:     file.path,
          cwd:      file.cwd,
          base:     file.base,
          // path component helpers
          relative: file.relative,
          dirname:  file.dirname,  // .../src/app
          basename: file.basename, // app.js
          stem:     file.stem,     // app
          extname:  file.extname   // .js
        });
      })
      .pipe(gulp.dest('build'));
});

```

Функции `gulp.src()` и `gulp.dest()` являются командами модуля `'vinyl-fs'`

- `gulp.src` -  находит все файлы, соответсвующие заданному шаблону выражения и формирует из них объекты *Vynil* - виртуальные файлы
- *Объекты Vynil* передаются по цепочке между плагинами
- `gulp.dest` -  получает виртуальные файлы из потока, и записывает файлы в указанную в параметрах директорию, сохраняя по умолчанию относительные пути из атрибутов объекта Vynil `file.relative`.

**Объект `file`:**

- contents - бинарное содержимое файла
- path - путь к файлу
- cwd - текущая директория проекта(откуда был запущена команда gulp)
- base - глобальный путь, например, `src`
- relative - относительный путь вычисляется на основе `path` c вычетом `base`
- dirname - имя директории
- basename - имя файла
- stem - название без расширения файла
- extname - расширение файла


```js
gulp.task('default', function() {
    return gulp.src('src/**/*.*')
        .on('data', function(file) {
            // every nodejs stream has a `data` event, so we can make a callback
            console.log({
                contents: file.contents,
                path:     file.path,
                cwd:      file.cwd,
                base:     file.base,
                // path component helpers
                relative: file.relative,
                dirname:  file.dirname,  // .../src/app
                basename: file.basename, // app.js
                stem:     file.stem,     // app
                extname:  file.extname   // .js
            });
        })
        .pipe(gulp.dest(function(file) {
            if(file.extname == '.js'){
                return 'js';
            }
            else if(file.extname == '.css'){
                return 'css'
            }
            else{
                return 'assets';
            }
        }));
});

```

 То же самое, используя тернарный оператор:
 

```js
gulp.task('default', function() {
  return gulp.src('src/**/*.*')
      .on('data', function(file) {
     	// every nodejs stream has a `data` event, so we can make a callback
        console.log({
          contents: file.contents,
          path:     file.path,
          cwd:      file.cwd,
          base:     file.base,
          // path component helpers
          relative: file.relative,
          dirname:  file.dirname,  // .../src/app
          basename: file.basename, // app.js
          stem:     file.stem,     // app
          extname:  file.extname   // .js
        });
      })
      .pipe(gulp.dest(function(file) {
        return file.extname == '.js' ? 'js' :
            file.extname == '.css' ? 'css' : 'assets';
      }));
});
```

**Модуль minimatch**

[https://www.npmjs.com/package/minimatch](https://www.npmjs.com/package/minimatch)

- `*.*`- все все файлы
- `**` - все директории
- `**/*.*` - все директории и файлы с любым расширением
- `**/*.{js,css}` - все файлы на любом уровне с расширением `.js` или `.css`
- `!tmp/**` - исключить директорию `tmp`

> При указании исключения в параметрах `gulp.src` объекты Vynil формируются, но не передаются далее в плагины. Поэтому лучше указывать конкретные директории и не добавлять в поток все файлы, а затем их исключать. Обработка может занять много времени

Если необходимо использовать несколько разных директорий:

- `gulp.src('{src1,src2}/**/*.*')` - получает из потока все подряд
- `gulp.src(['src1/**/*.*','src2/**/*.*'])` - получает отдельно из потока
- `gulp.src('src/scss/{main,colors}.scss')` - обрабатывает два разных файла подряд

**Не считывать `file.contents`**

В случае, если вы не производите перемещение файлов или обработку их содержимого и необходимо передавать в поток только данные о пути к этим файлам, тогда для ускорения работы можно использовать дополнительный атрибут для `gulp.src()` `{read:false}`

- `gulp.src(['src/**/*.*'],{read:false})` - передает файлы, но не работает с их содержимым



### 5 Gulp — плагины 

* **gulp-htmlmin** — минификация html
* **gulp-pug** — компиляция pug и jade
* gulp-htmlhint — HTML валидатор

-

* **gulp-sass** — компиляция sass и scss
* gulp-stylus — компиляция stylus в css
* gulp-less — компиляция less в css
* **gulp-autoprefixer** — плагин постпроцессора css. Расставляет вендорные префиксы.
* **gulp-strip-css-comments** — убрать комментарии из css
* gulp-uncss — оптимизации CSS файлов. Плагин анализирует HTML код и находит все неиспользуемые и продублированные стили



-

* **gulp-rigger** — механизм инклудов для JavaScript, CSS, CoffeeScript и любых текстовых файлов
* **gulp-uglify** — минификация JavaScript
* gulp-coffee — CoffeeScript в JavaScript

-

* **gulp-if** — плагин встраивания условий в поток задачи
* **gulp-rename** — плагин для переименования файлов
* **gulp-notify** —выводит сообщения при сборке в виде системных сообщений, работает для разных операционных систем
* **gulp-sftp** — обеспечивает возможность подключения по SFTP и асинхронную загрузку файлов
* **browser-sync** — плагин для запуска веб-сервера и перезагрузки страниц при изменении кода
* **rimraf** — стандартный пакет Node.js для удаления

-

* **gulp-email-design** — инструмент при верстке писем, который переводит все CSS стили в инлайновые, автоматически изменяя все пути к файлам, опционально умеет загружать изображения на CDN и даже отсылать письма на почту

-

### 5.2 Типовые задачи

#### 5.2.1 Удаление файлов

**Модули:**

`rimraf` (встроенный в Node.js, не требует установки)

**Подключение:**

```js
const rimraf = require('rimraf');

```
**Вызов в задаче:**

```js
gulp.task('clean', function(done){
    rimraf(path.clean, done);
});

```
-
#### 5.2.2 Сборка css-стилей

**Модули:**

`gulp-sass`
`gulp-autoprefixer`
`gulp-strip-css-comments`
`browser-sync`

**Подключение:**

```js
const gulp = require('gulp'),
    sass = require('gulp-sass'),//плагин компиляции scss
    prefixer = require('gulp-autoprefixer'),//плагин расстановки префиксов
    stripCssComments = require('gulp-strip-css-comments'),// убрать комментарии из кода
    browserSync = require('browser-sync'),
    reload = browserSync.reload;
```


**Вызов в задаче: Production**

> При выгрузке кода на работающий сайт необходимо делать сборку с минификацией кода, без source map файлов - файлов, которые содержат информацию об исходном коде минимизированных файлов.
> В задаче формируется поток объектов Vynil, который последовательно обрабатывается плагином компиляции scss, затем autoprefixer, затем удаляются все комментарии из файлов и происходит запись в указанную директорию на диск

```js
gulp.task('prod:scss',function(done){
    gulp.src(path.src.scss)
        .pipe(sass({
            outputStyle:"compressed",
            sourcemaps:false
        }))
        .pipe(prefixer({
            cascade:false,
            browsers: ['last 5 versions'],
            remove:true
        }))
        .pipe(stripCssComments())
        .pipe(gulp.dest(path.build.scss));
    done();
});
```


**Вызов в задаче: Development**

> При разработке удобно делать сборку с минификацией кода, с source map файлами.
> В задаче формируется поток объектов Vynil, который последовательно обрабатывается плагином компиляции scss, затем autoprefixer, затем удаляются все комментарии из файлов и происходит запись в указанную директорию на диск.
> В начале формирования потока и в конце при выгрузке происходит инициализация и запись *.map - файлов.
> После выгрузки файлов запускается перезагрузка веб-сервера.


```js
gulp.task('dev:scss',function(done){
    gulp.src(path.src.scss,{sourcemaps:true})
        .pipe(sass({
            outputStyle:"compressed", //expanded,compact,nested
            sourcemaps:false
        }))
        .pipe(prefixer({
            cascade:false,//unminify css
            browsers: ['last 5 versions'],// browser support
            remove:true // remove unnecessary rules
        }))
        .pipe(gulp.dest(path.build.scss,{sourcemaps:'.'}))
        .pipe(reload({stream: true})); // run browser-sync reload
    done();
});
```

-

#### 5.2.3 Минимизация HTML - файлов

**Модули:**

`gulp-htmlmin`
`browser-sync`

**Подключение:**

```js
const gulp = require('gulp'),
    htmlmin = require('gulp-htmlmin'),
    browserSync = require('browser-sync'),
    reload = browserSync.reload;
```


**Вызов в задаче:**

> В задаче формируется поток объектов Vynil, который последовательно обрабатывается плагином, затем происходит запись в указанную директорию на диск.
> После выгрузки файлов запускается перезагрузка веб-сервера.

```js
gulp.task('dev:html',function(done){
    gulp.src(path.src.html)
        .pipe(htmlmin({ collapseWhitespace: true }))
        .pipe(gulp.dest(path.build.html))
        .pipe(reload({stream: true})); // browser-sync
    done();
});
```

#### 5.2.4 Перезагрузка веб-сервера browser-sync

**Модули:**

`browser-sync`

**Подключение:**

```js
const gulp = require('gulp'),
    browserSync = require('browser-sync'),
    reload = browserSync.reload;
```
**Конфигурация:**

```js
 var config = {
        server: {
            baseDir: "./", // base directory
            index:"index.html", // start page
        },
        tunnel: true, // tunnel
        //proxy: 'donate.local', // for php and xampp vhosts
        host: 'localhost',
        port: 7787,
        logPrefix: "WebDev"
};
```

**Вызов в задаче:**


```js

gulp.task('webserver', function (done) {
    browserSync(config);
    done();
});

```

#### 5.2.5 Сборка JavaScript

**Модули:**

`gulp-rigger`
`gulp-uglify`
`browser-sync`

**Подключение:**

```js
const gulp = require('gulp'),
	rigger = require('gulp-rigger'),
    uglify = require('gulp-uglify'),
    browserSync = require('browser-sync'),
    reload = browserSync.reload;
```


**Вызов в задаче: Production**


```js
gulp.task('prod:js', function (done) {
    gulp.src(path.src.js)
        .pipe(rigger())
        .pipe(uglify())
        .pipe(gulp.dest(path.build.js));
    done();
});

```
**Вызов в задаче: Development**

```js
gulp.task('dev:js', function (done) {
    gulp.src(path.src.js,{sourcemaps: true})
        .pipe(rigger())
        .pipe(gulp.dest(path.build.js,{sourcemaps:'.'}))
        .pipe(reload({stream:true}));
    done();
});

```

#### 5.2.6 Отправка файлов по SFTP

**Модули:**

`gulp-sftp`

[https://www.npmjs.com/package/gulp-sftp](https://www.npmjs.com/package/gulp-sftp)

**Подключение:**

```js
const gulp = require('gulp'),
	sftp = require('gulp-sftp'),
	fs = require('fs');// работа с файловой системой
```
**Конфигурация:**

```js
 var site = {
            server:"test.ru",
            user:"test",
            pass:"Test#Site",
            port:"10000",
            folder:"" // site directory public_hmtl or www
};

```
**Вызов в задаче:**


```js
gulp.task('sftp:push', function (done) {
    gulp.src(path.build.all)
        .pipe(sftp({
            host: site.server,
            user: site.user,
            pass: site.pass,
            port: site.port,
            remotePath:site.folder
        }));
    done();
});

```

#### 5.2.6 Отправка файлов по RSYNC

**Модули:**

`gulp-rsync`

[https://www.npmjs.com/package/gulp-rsync](https://www.npmjs.com/package/gulp-rsync)

**Подключение:**

```js
var gulp = require('gulp'),
	rsync = require('gulp-rsync');

```
**Конфигурация:**

```js
 var rsync = {
      root: 'build/',
      hostname: 'example.com',
      destination: 'path/to/site/',
      archive: true,
      silent: false,
      compress: true
};

```
**Вызов в задаче:**


```js
gulp.task('deploy', function() {
  gulp.src('build/**')
    .pipe(rsync(rsync));
});

```


#### 5.3 Проверка аргументов


```js
/**Returns arguments array passed through the command line after the task name
 * Algorithm compares received arguments and values with normalized ones
 * to find out whether argument name or value is passed into console
 * Afterwards it forms arg[curOpt] element and sets it to 'true',
 * so if an argument name is not provided with value it will have a 'true' value by default
 * Then we check whether the argument value is set and we need to override it
 * @property {object} [argList] arguments array from current node process process.argv
 * @property {number} [a] arguments counter
 * @property {string} [thisOpt] received argument from array
 * @property {string} [opt] argument without '-' or '--'
 * @property {string} [curOpt] current used argument
 * @return {object} [arg] array of argument names and values
 */
 
const arg = (argList => {
// get arguments passed in node process through process.argv to argList
   
    let arg = {}, a, opt, thisOpt, curOpt;
   	 
   	 // go through argList 
    for (a = 0; a < argList.length; a++) {
    
    	// trim each object element
        thisOpt = argList[a].trim();
        
        // replace - or -- from key arguments
        opt = thisOpt.replace(/^\-+/, '');
        
        if (opt === thisOpt) {
            // argument value
            if (curOpt) arg[curOpt] = opt;
            curOpt = null;
        }
        else {
            // argument name
            curOpt = opt;
            arg[curOpt] = true;
        }
    }
    return arg;
})(process.argv);
```



