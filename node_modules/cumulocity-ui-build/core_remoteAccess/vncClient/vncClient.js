/* global Util, WebUtil, $D, RFB */
(function () {
  'use strict';

  // Load supporting scripts
  Util.load_scripts([
    'webutil.js',
    'base64.js',
    'websock.js',
    'des.js',
    'keysymdef.js',
    'keyboard.js',
    'input.js',
    'display.js',
    'inflator.js',
    'rfb.js',
    'keysym.js'
  ]);

  var rfbConnection;
  var resizeTimeout;
  var paramsId;
  var params;

  var STATES = {
    LOADED: 'loaded',
    NORMAL: 'normal',
    FAILED: 'failed',
    FATAL: 'fatal',
    DISCONNECTED: 'disconnected'
  };

  function loadParams() {
    paramsId = WebUtil.getConfigVar('paramsId', null);
    try {
      params = JSON.parse(window.localStorage.getItem(paramsId));
    } catch (ex) {
      console.err('Cannot load connection parameters!');
    }
  }

  function resizeUI() {
    if (WebUtil.getConfigVar('resize', false)) {
      var innerW = window.innerWidth;
      var innerH = window.innerHeight;
      var controlbarH = $D('noVNC_status_bar').offsetHeight;
      var padding = 5;
      if (innerW !== undefined && innerH !== undefined) {
        rfbConnection.requestDesktopSize(innerW, innerH - controlbarH - padding);
      }
    }
  }

  function FBUComplete(rfb) {
    resizeUI();
    rfb.set_onFBUComplete(function () { });
  }

  function sendCtrlAltDel() {
    rfbConnection.sendCtrlAltDel();
    return false;
  }

  function xvpShutdown() {
    rfbConnection.xvpShutdown();
    return false;
  }

  function xvpReboot() {
    rfbConnection.xvpReboot();
    return false;
  }

  function xvpReset() {
    rfbConnection.xvpReset();
    return false;
  }

  function updateState(rfb, state, oldstate, msg) {
    var level;
    var s = $D('noVNC_status');
    var sb = $D('noVNC_status_bar');
    var cad = $D('sendCtrlAltDelButton');
    switch (state) {
      case STATES.FAILED:
        level = 'error';
        break;
      case STATES.FATAL:
        level = 'error';
        break;
      case STATES.NORMAL:
        level = 'normal';
        break;
      case STATES.DISCONNECTED:
        level = 'normal';
        break;
      case STATES.LOADED:
        level = 'normal';
        break;
      default:
        level = 'warn';
        break;
    }

    if (state === STATES.NORMAL) {
      cad.disabled = false;
    } else {
      cad.disabled = true;
      xvpInit(0);
    }

    params.status = params.status || {};

    if (typeof msg !== 'undefined') {
      sb.setAttribute('class', `noVNC_status_${level}`);
      s.textContent = msg;
      params.status.msg = msg;
    } else {
      params.status.msg = '';
    }

    params.status.state = state;
    params.status.level = level;

    window.localStorage.setItem(paramsId, JSON.stringify(params));
  }

  window.onresize = function () {
    clearTimeout(resizeTimeout);
    resizeTimeout = setTimeout(function () {
      resizeUI();
    }, 500);
  };

  function xvpInit(ver) {
    var xvpbuttons = $D('noVNC_xvp_buttons');
    if (ver >= 1) {
      xvpbuttons.style.display = 'inline';
    } else {
      xvpbuttons.style.display = 'none';
    }
  }

  window.onscriptsload = function () {
    loadParams();

    var cad = $D('sendCtrlAltDelButton');
    cad.style.display = 'inline';
    cad.onclick = sendCtrlAltDel;

    $D('xvpShutdownButton').onclick = xvpShutdown;
    $D('xvpRebootButton').onclick = xvpReboot;
    $D('xvpResetButton').onclick = xvpReset;

    WebUtil.init_logging(params.logging || 'warn');
    document.title = unescape(params.title || 'noVNC');

    if ((!params.host) || (!params.port)) {
      updateState(null, STATES.FATAL, null, 'Must specify host and port in URL');
      return;
    }

    try {
      rfbConnection = new RFB(_.defaults(
        _.omit(params, ['path', 'host', 'viewport', 'port', 'password', 'status']),
        {
          target: $D('noVNC_canvas'),
          onUpdateState: updateState,
          onXvpInit: xvpInit,
          onFBUComplete: FBUComplete
        }
      ));
    } catch (exc) {
      updateState(null, STATES.FATAL, null, `Unable to create RFB client -- ${exc}`);
      return;
    }

    rfbConnection.connect(params.host, params.port, params.password, params.path);
  };
})();
