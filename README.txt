HyperShell
==========

A web-based window manager, made with Angular and Tailwind.
It's also a master's thesis on Software Architecture
It's also an SDK (see HSDK.txt for more details).


Software design
===============

Below is a rough and simplified overview of HyperShell's architecture :

  ---------- ----------       ----------
  |  AppX  | |  AppY  | (...) |  AppN  |  <----- <app-window [body]="#windowBody"/> instances
  ---------- ----------       ----------         \_ <ng-template #windowBody/> (self-contained processes)
      ^ |        ^                ^
      | |        |                |  <----- 1 or 2-way data bindings, dependency injection of AppComponent,
      | |        |                |         and Angular's change detection system.
      | v        |                |
  --------------------------------------
  |                                    |  <----- Taskbar, Root DOM,
  |         Desktop  Component         |         Date & Time, non-sensitive data accessible to all Applications.
  |             (#desktop)             |
  --------------------------------------
  |   Lib. X   |   Lib. Y   |  Lib. N  |  <----- @Injectable({providedIn: 'root'})
  --------------------------------------         \_ mounted libraries through
                                                    AppComponent's public/protected API


Here is a list of planned features for HyperShell :
    - Drag & drop support (for files and folders)
    - TMPFS, in-memory filesystem
    - HyperFM : File Manager
    - Window snapping
    - Window tiling
    - Window management
    - Window animations
    - User-installable applications
    - User-defined themes
    - Theme Marketplace hosted through https://marketplace.hypershell.dev/
    - User-defined shortcuts
    - User-defined keybindings
    - Touchscreen support
    - Accessibility support (Screen readers)
    - 60 FPS desktop experience
    - Sample games (Tetris, Snake, Minesweeper, etc.)
    - Text Editor (with syntax highlighting)
    - Terminal Emulator (with support for SSH, SFTP, etc.)
      \_ Research needs to be done on how to implement this, CORS is a pain in the ass.
    - HyperInception, a web browser inside a web browser, with support for favourites and extensions.
    - Photo viewer (with support for .avif, .webp, .jpeg, .png, .heic)
    - Music player (with support for .wav, .ogg, .flac, .mp3)
    - WebAssembly support (rust?)
    - HyperVideo, a video player relying on Videolan's decoding libraries (through WASM probably)
    - Start menu, with pinnable favourites (Inception integration?)
    - Notification center
    - Calendar


Applications
============

A HyperShell application contains standalone code and cannot communicate directly with other applications.
They are self-managed and self-contained, and they can be loaded and unloaded at any time.
Although they are not directly connected to each other, they can communicate with the HyperShell desktop,
through the AppComponent.shell property.
For this, applications need to rely on Angular's dependency injection system through the Application constructor, that is :

  constructor(public readonly hypershell: AppComponent) {}

Here, we have added the public modifier to the hypershell property,
which allows us to access the hypershell instance from the application's template.
Note that the hypershell property should always be immutable.


Styling
=======

The Tailwind CSS framework is provided, but an Application is free to define any custom - and scoped - CSS classes
to use at will.

By default, applications contain no background-color property. Thus, empty HyperShell windows are semi-transparent and have a blurred backdrop effect.
Application developers are encouraged to use transparency sparingly, it does bring accessibility issues and too much transparency can be visually overwhelming.
In order to opt-out of transparency, set a background-color property in the application's CSS file or in its template through Tailwind's utility classes.


The HyperShell SDK
==================

Each HyperShell Application must implement the HSDK.Application interface,
which is a simple interface that defines the basic properties and methods of an application.
Such as, but not limited to, the application name, the transparency property and whether the app is allowed to be resized.


Why create HyperShell?
======================

Because it's fun.
