var __stxBundle_0d49d93d0de8 = (function() {

var __defProp = Object.defineProperty;
var __returnValue = (v) => v;
function __exportSetter(name, newValue) {
  this[name] = __returnValue.bind(null, newValue);
}
var __export = (target, all) => {
  for (var name in all)
    __defProp(target, name, {
      get: all[name],
      enumerable: true,
      configurable: true,
      set: __exportSetter.bind(all, name)
    });
};

// node_modules/@stacksjs/components/dist/overlays/overlays.js
var exports_overlays = {};
__export(exports_overlays, {
  closeOverlay: () => closeOverlay,
  isTopOverlay: () => isTopOverlay,
  openOverlay: () => openOverlay,
  openOverlays: () => openOverlays
});
function stack() {
  return globalThis.stx?.overlays;
}
function openOverlay(id, options) {
  stack()?.open(id, options);
}
function closeOverlay(id) {
  stack()?.close(id);
}
function isTopOverlay(id) {
  return stack()?.isTop(id) ?? false;
}
function openOverlays() {
  return stack()?.list() ?? [];
}

// node_modules/@stacksjs/mobile/dist/index.js
var exports_dist = {};
__export(exports_dist, {
  BRIDGE_WAIT_MS: () => Dr,
  HEART_RATE_MATCH_MS: () => Co,
  INDOOR_CHECK_AFTER_S: () => jo,
  MAX_SPOTLIGHT_SLOTS_PER_KIND: () => ai,
  ROUTE_FULL_READ_FIXES: () => Ot,
  ROUTE_FULL_READ_MAX_MS: () => Mn,
  ROUTE_GAP_S: () => En,
  SHEET_FLICK_VELOCITY: () => Qo,
  TAB_BAR_COVER_EVENT: () => Ue,
  afterBridge: () => d,
  appReview: () => wr,
  applyAppearance: () => Fn,
  attachHeartRate: () => An,
  auth: () => pt,
  backLabelFor: () => Eo,
  background: () => ae,
  biometrics: () => dr,
  bridgePending: () => ge,
  brightness: () => xr,
  browser: () => ot,
  callNative: () => w,
  camera: () => pr,
  canGoBack: () => wn,
  chrome: () => ie,
  clipboard: () => at,
  confirmAction: () => $r,
  contextMenu: () => De,
  coverTabBar: () => fi,
  craftHost: () => E2,
  craftRoot: () => Q2,
  crashReporting: () => co,
  createRouteRecorder: () => _o,
  createRouteStats: () => ve,
  createSpotlightIndex: () => li,
  createVoiceRecorder: () => ar,
  crypto: () => bt,
  currentAppearance: () => Rt,
  db: () => st,
  deepLinkPath: () => Rn,
  deepLinks: () => Sr,
  device: () => fr,
  dialog: () => oe,
  enterNavTrail: () => ko,
  files: () => lt,
  fixDistance: () => On,
  focusSegment: () => ro,
  followDeepLinks: () => Mo,
  getNativeMobileBridge: () => V,
  goBack: () => Ao,
  goBackToTabRoot: () => Po,
  handleTabReselect: () => pi,
  haptics: () => Oe,
  hasNativeMobileHost: () => re,
  health: () => Pr,
  heartRate: () => kr,
  indoorVerdict: () => zo,
  installNativeChrome: () => oi,
  installPressables: () => oo,
  isNativeMobile: () => ze,
  isShown: () => Nn,
  keepAwake: () => Rr,
  keepBreadcrumb: () => pn,
  largeTitleMetrics: () => vn,
  lifecycle: () => mr,
  liftToBody: () => Zo,
  liveActivities: () => Ir,
  location: () => gr,
  mirrorTabBar: () => mi,
  mobile: () => Ei,
  music: () => Ar,
  nativeFunction: () => Xt,
  nativeFunctionNow: () => M2,
  nativeTabs: () => or,
  navTrail: () => To,
  network: () => Tr,
  normalizeAppearance: () => mn,
  normalizeDeepLinkURL: () => zt,
  normalizeScheduledWorkout: () => cn,
  notifications: () => hr,
  observeLargeTitle: () => So,
  observeLongPress: () => eo,
  observeNativeRefresh: () => Yo,
  observePageScroll: () => hn,
  observePullToRefresh: () => wo,
  observeSegmentScrub: () => to,
  observeSheetDrag: () => Jo,
  onAppearance: () => xt,
  onBackgroundRefresh: () => bo,
  onCraftEvent: () => W,
  onMemoryWarning: () => go,
  onMobileReady: () => Cr,
  onResume: () => mo,
  onSilentPush: () => ho,
  onSpotlightTap: () => ci,
  orientation: () => dt,
  paceLabel: () => Do,
  pageBackground: () => Wn,
  pageIsDark: () => $n,
  pageScrollTop: () => se,
  pauseSessionClock: () => Uo,
  permissions: () => br,
  placeMenu: () => tn,
  placeSpotlightItem: () => qn,
  presentActionSheet: () => Je,
  presentAlert: () => Xe,
  presentChoice: () => Ie,
  presentConfirm: () => Qe,
  presentContextMenu: () => Ze,
  presentPageAsCard: () => ei,
  previousScreenPath: () => Oo,
  pullDistance: () => bn,
  pushNotifications: () => Or,
  readSpotlightEntries: () => Yn,
  readSpotlightKinds: () => Lt,
  readTabLinks: () => rr,
  refresh: () => Y,
  removeSpotlightItem: () => Vn,
  resolveScrollHost: () => Ro,
  resumeSessionClock: () => Wo,
  routeReadInterval: () => Ln,
  routeStats: () => In,
  routerHandlesTabs: () => ir,
  rubberBand: () => Bn,
  scheduledWorkouts: () => yt,
  scheduledWorkoutsUnsupported: () => ln,
  secureStorage: () => vr,
  segmentAt: () => un,
  segmentForKey: () => no,
  sessionClockElapsed: () => $o,
  settleSheet: () => _n,
  share: () => yr,
  sheetStops: () => Hn,
  shortcuts: () => ct,
  showContextMenuFor: () => Kr,
  snapshots: () => Ai,
  speech: () => Er,
  speedLabel: () => Ho,
  splash: () => ki,
  spotlightAction: () => le,
  spotlightActions: () => Ct,
  spotlightActivityTypes: () => si,
  spotlightBridge: () => Jn,
  spotlightKind: () => ce,
  spotlightRoute: () => Gn,
  spotlightSlot: () => zn,
  spotlightTitle: () => Nt,
  startSessionClock: () => Fo,
  statusBar: () => he,
  storage: () => ht,
  storeKit: () => ft,
  subscribeWhenReady: () => J,
  symbols: () => it,
  tabBar: () => nr,
  toNativeRect: () => Ne,
  trailEntryFor: () => Io,
  typedDistanceKm: () => qo,
  usableFixes: () => No,
  useActionSheet: () => Wr,
  voiceRecordingFormData: () => sr,
  watchConnectivity: () => Mr,
  whenBridgeReady: () => ee,
  whenNativeMobile: () => Lr,
  widgets: () => ut,
  withNativeFeedback: () => Nr
});

// node_modules/craft-native/dist/mobile.js
function secureUUID() {
  const c = globalThis.crypto;
  if (c && typeof c.randomUUID === "function") {
    return c.randomUUID();
  }
  if (c && typeof c.getRandomValues === "function") {
    const bytes = new Uint8Array(16);
    c.getRandomValues(bytes);
    bytes[6] = bytes[6] & 15 | 64;
    bytes[8] = bytes[8] & 63 | 128;
    const hex = Array.from(bytes, (b) => b.toString(16).padStart(2, "0")).join("");
    return `${hex.slice(0, 8)}-${hex.slice(8, 12)}-${hex.slice(12, 16)}-${hex.slice(16, 20)}-${hex.slice(20, 32)}`;
  }
  throw new Error("[Craft] No Web Crypto available; cannot generate secure IDs");
}
function createLiveActivityHandle(id, update, end) {
  return {
    id,
    update,
    end
  };
}
var WEB_DEVICE_ID_KEY = "__craft_web_device_id__";
function _webFallbackDeviceId() {
  if (typeof globalThis !== "undefined" && globalThis.localStorage) {
    try {
      const ls = globalThis.localStorage;
      const existing = ls.getItem(WEB_DEVICE_ID_KEY);
      if (existing && /^web-[0-9a-f-]+$/i.test(existing))
        return existing;
      const fresh = `web-${secureUUID()}`;
      ls.setItem(WEB_DEVICE_ID_KEY, fresh);
      return fresh;
    } catch {}
  }
  return `web-${secureUUID()}`;
}
var device = {
  async getInfo() {
    const craft = getCraftMobile();
    if (typeof window !== "undefined" && craft?.device) {
      return craft.device.getInfo();
    }
    return {
      platform: detectPlatform(),
      osVersion: "unknown",
      model: "unknown",
      manufacturer: "unknown",
      deviceId: _webFallbackDeviceId(),
      isTablet: false,
      screen: {
        width: typeof window !== "undefined" ? window.innerWidth || 0 : 0,
        height: typeof window !== "undefined" ? window.innerHeight || 0 : 0,
        scale: typeof window !== "undefined" ? window.devicePixelRatio || 1 : 1
      },
      battery: { level: 100, isCharging: false },
      network: { type: "wifi", isConnected: typeof navigator !== "undefined" ? navigator.onLine ?? true : true }
    };
  },
  async getCapabilities() {
    const craft = getCraftMobile();
    if (typeof window !== "undefined" && craft?.device) {
      return craft.device.getCapabilities();
    }
    return {
      camera: true,
      biometrics: false,
      nfc: false,
      bluetooth: false,
      gps: "geolocation" in navigator,
      accelerometer: false,
      gyroscope: false,
      haptics: "vibrate" in navigator,
      ar: false,
      faceId: false,
      touchId: false
    };
  },
  isMobile() {
    const platform = detectPlatform();
    return platform === "ios" || platform === "android";
  },
  isIOS() {
    return detectPlatform() === "ios";
  },
  isAndroid() {
    return detectPlatform() === "android";
  },
  getLocale() {
    return navigator?.language || "en-US";
  },
  getTimezone() {
    return Intl.DateTimeFormat().resolvedOptions().timeZone;
  }
};
var haptics = {
  async impact(style = "medium") {
    const craft = getCraftMobile();
    if (typeof window !== "undefined" && craft?.haptics) {
      return craft.haptics.impact(style);
    }
    if ("vibrate" in navigator) {
      const duration = { light: 10, medium: 20, heavy: 30, soft: 5, rigid: 25 }[style];
      navigator.vibrate(duration);
    }
  },
  async notification(type = "success") {
    const craft = getCraftMobile();
    if (typeof window !== "undefined" && craft?.haptics) {
      return craft.haptics.notification(type);
    }
    if ("vibrate" in navigator) {
      const patterns = {
        success: [10, 30, 10],
        warning: [30, 30, 30],
        error: [50, 50, 50, 50, 50]
      };
      navigator.vibrate(patterns[type]);
    }
  },
  async selection() {
    const craft = getCraftMobile();
    if (typeof window !== "undefined" && craft?.haptics) {
      return craft.haptics.selection();
    }
    if ("vibrate" in navigator) {
      navigator.vibrate(5);
    }
  },
  async prepare(kind) {
    const craft = getCraftMobile();
    if (typeof window !== "undefined" && craft?.haptics?.prepare) {
      try {
        await craft.haptics.prepare(kind);
      } catch {}
    }
  },
  async vibrate(pattern) {
    const craft = getCraftMobile();
    if (typeof window !== "undefined" && craft?.haptics) {
      return craft.haptics.vibrate(pattern);
    }
    if ("vibrate" in navigator) {
      navigator.vibrate(pattern);
    }
  }
};
var permissions = {
  async check(permission) {
    const craft = getCraftMobile();
    if (typeof window !== "undefined" && craft?.permissions) {
      return craft.permissions.check(permission);
    }
    try {
      const webPermission = mapToWebPermission(permission);
      if (webPermission && navigator.permissions) {
        const result = await navigator.permissions.query({ name: webPermission });
        return mapWebPermissionStatus(result.state);
      }
    } catch {}
    return "undetermined";
  },
  async request(permission) {
    const craft = getCraftMobile();
    if (typeof window !== "undefined" && craft?.permissions) {
      return craft.permissions.request(permission);
    }
    try {
      if (permission === "camera" || permission === "microphone") {
        const constraints = {};
        if (permission === "camera")
          constraints.video = true;
        if (permission === "microphone")
          constraints.audio = true;
        const stream = await navigator.mediaDevices.getUserMedia(constraints);
        stream.getTracks().forEach((track) => track.stop());
        return "granted";
      }
      if (permission === "location") {
        return new Promise((resolve) => {
          navigator.geolocation.getCurrentPosition(() => resolve("granted"), () => resolve("denied"));
        });
      }
      if (permission === "notifications") {
        const result = await Notification.requestPermission();
        return result === "granted" ? "granted" : "denied";
      }
    } catch {
      return "denied";
    }
    return "undetermined";
  },
  async checkMultiple(permissionList) {
    const results = {};
    for (const perm of permissionList) {
      results[perm] = await this.check(perm);
    }
    return results;
  },
  async requestMultiple(permissionList) {
    const results = {};
    for (const perm of permissionList) {
      results[perm] = await this.request(perm);
    }
    return results;
  },
  async openSettings() {
    const craft = getCraftMobile();
    if (typeof window !== "undefined" && craft?.permissions) {
      return craft.permissions.openSettings();
    }
  }
};
var camera = {
  async takePicture(options = {}) {
    const craft = getCraftMobile();
    if (typeof window !== "undefined" && craft?.camera) {
      return craft.camera.takePicture(options);
    }
    throw new Error("Camera API not available. Must run in Craft environment.");
  },
  async pickImage() {
    const craft = getCraftMobile();
    if (typeof window !== "undefined" && craft?.camera) {
      return craft.camera.pickImage();
    }
    return new Promise((resolve, reject) => {
      const input = document.createElement("input");
      input.type = "file";
      input.accept = "image/*";
      input.onchange = async () => {
        const file = input.files?.[0];
        if (file) {
          const reader = new FileReader;
          reader.onload = () => {
            const base64 = reader.result.split(",")[1];
            resolve({
              base64,
              uri: URL.createObjectURL(file),
              width: 0,
              height: 0,
              mimeType: file.type
            });
          };
          reader.onerror = () => reject(new Error("Failed to read file"));
          reader.readAsDataURL(file);
        } else {
          reject(new Error("No file selected"));
        }
      };
      input.click();
    });
  },
  async pickMultiple(options = {}) {
    const craft = getCraftMobile();
    if (typeof window !== "undefined" && craft?.camera) {
      return craft.camera.pickMultiple(options);
    }
    throw new Error("Camera API not available. Must run in Craft environment.");
  },
  async isAvailable() {
    const craft = getCraftMobile();
    if (typeof window !== "undefined" && craft?.camera) {
      return craft.camera.isAvailable();
    }
    try {
      const devices = await navigator.mediaDevices.enumerateDevices();
      return devices.some((d) => d.kind === "videoinput");
    } catch {
      return false;
    }
  }
};
var biometrics = {
  async isAvailable() {
    const craft = getCraftMobile();
    if (typeof window !== "undefined" && craft?.biometrics) {
      return craft.biometrics.isAvailable();
    }
    return false;
  },
  async getBiometricType() {
    const craft = getCraftMobile();
    if (typeof window !== "undefined" && craft?.biometrics) {
      return craft.biometrics.getBiometricType();
    }
    return null;
  },
  async authenticate(reason) {
    const craft = getCraftMobile();
    if (typeof window !== "undefined" && craft?.biometrics) {
      return craft.biometrics.authenticate(reason);
    }
    throw new Error("Biometrics not available");
  }
};
var secureStorage = {
  async set(key, value) {
    const craft = getCraftMobile();
    if (typeof window !== "undefined" && craft?.secureStorage) {
      return craft.secureStorage.set(key, value);
    }
    if (typeof window !== "undefined" && window.craft)
      throw new Error("Craft secure storage bridge is unavailable");
    localStorage.setItem(`secure_${key}`, value);
  },
  async get(key) {
    const craft = getCraftMobile();
    if (typeof window !== "undefined" && craft?.secureStorage) {
      return craft.secureStorage.get(key);
    }
    if (typeof window !== "undefined" && window.craft)
      throw new Error("Craft secure storage bridge is unavailable");
    return localStorage.getItem(`secure_${key}`);
  },
  async delete(key) {
    const craft = getCraftMobile();
    if (typeof window !== "undefined" && craft?.secureStorage) {
      return craft.secureStorage.delete(key);
    }
    if (typeof window !== "undefined" && window.craft)
      throw new Error("Craft secure storage bridge is unavailable");
    localStorage.removeItem(`secure_${key}`);
  },
  async remove(key) {
    const craft = getCraftMobile();
    if (typeof window !== "undefined" && craft?.secureStorage) {
      if (typeof craft.secureStorage.remove === "function")
        return craft.secureStorage.remove(key);
      return craft.secureStorage.delete(key);
    }
    if (typeof window !== "undefined" && window.craft)
      throw new Error("Craft secure storage bridge is unavailable");
    localStorage.removeItem(`secure_${key}`);
  },
  async clear() {
    const craft = getCraftMobile();
    if (typeof window !== "undefined" && craft?.secureStorage) {
      return craft.secureStorage.clear();
    }
    if (typeof window !== "undefined" && window.craft)
      throw new Error("Craft secure storage bridge is unavailable");
    Object.keys(localStorage).filter((k) => k.startsWith("secure_")).forEach((k) => localStorage.removeItem(k));
  }
};
var RECORDING_POWER_MODES = ["default", "saver", "auto"];
function storageHost(method) {
  const host = getCraftRoot()?.storage;
  if (typeof host?.[method] !== "function")
    throw Object.assign(new Error("This host does not provide native storage"), { code: "STORAGE_UNSUPPORTED" });
  return host;
}
var crypto = {
  async randomUUID() {
    const root = getCraftRoot();
    if (!root)
      return secureUUID();
    const caps = root.capabilities;
    const advertised = Array.isArray(caps) ? caps.includes("crypto") : caps?.crypto === true;
    if (!advertised || typeof root.crypto?.randomUUID !== "function")
      throw Object.assign(new Error("This host does not provide secure UUIDs"), { code: "CRYPTO_UNSUPPORTED" });
    const id = await root.crypto.randomUUID();
    if (typeof id !== "string" || !/^[0-9a-f]{8}-[0-9a-f]{4}-4[0-9a-f]{3}-[89ab][0-9a-f]{3}-[0-9a-f]{12}$/i.test(id))
      throw Object.assign(new Error("The host returned an invalid secure UUID"), { code: "CRYPTO_INVALID_RESPONSE" });
    return id;
  }
};
var storage = {
  supportsSetIfAbsent() {
    const root = getCraftRoot();
    const caps = root?.capabilities;
    const supported = Array.isArray(caps) ? caps.includes("storageSetIfAbsent") : caps?.storageSetIfAbsent === true;
    return supported && typeof root?.storage?.setIfAbsent === "function";
  },
  supportsCompareAndSet() {
    const root = getCraftRoot();
    const caps = root?.capabilities;
    const supported = Array.isArray(caps) ? caps.includes("storageCompareAndSet") : caps?.storageCompareAndSet === true;
    return supported && typeof root?.storage?.compareAndSet === "function";
  },
  async get(key) {
    return storageHost("get").get(key);
  },
  async set(key, value) {
    return storageHost("set").set(key, value);
  },
  async remove(key) {
    return storageHost("remove").remove(key);
  },
  async clear() {
    return storageHost("clear").clear();
  },
  async keys() {
    return storageHost("keys").keys();
  },
  async setIfAbsent(key, value) {
    if (!storage.supportsSetIfAbsent())
      throw Object.assign(new Error("This app build cannot atomically register an intent"), { code: "STORAGE_SET_IF_ABSENT_UNSUPPORTED" });
    if (typeof key !== "string" || !key.trim() || JSON.stringify(value) === undefined)
      throw Object.assign(new Error("setIfAbsent needs a key and JSON value"), { code: "INVALID_ARGUMENT" });
    return storageHost("setIfAbsent").setIfAbsent(key, value);
  },
  async compareAndSet(key, expectedValue, nextValue) {
    if (!storage.supportsCompareAndSet())
      throw Object.assign(new Error("This app build cannot atomically checkpoint existing storage"), { code: "STORAGE_COMPARE_AND_SET_UNSUPPORTED" });
    if (typeof key !== "string" || !key.trim() || JSON.stringify(expectedValue) === undefined || JSON.stringify(nextValue) === undefined)
      throw Object.assign(new Error("compareAndSet needs a key and JSON values"), { code: "INVALID_ARGUMENT" });
    return storageHost("compareAndSet").compareAndSet(key, expectedValue, nextValue);
  }
};
function recordingOwnershipSupported(namespace) {
  const root = getCraftRoot();
  const flag = namespace === "location" ? "locationRecordingOwnership" : "heartRateRecordingOwnership";
  const caps = root?.capabilities;
  const advertised = Array.isArray(caps) ? caps.includes(flag) : caps?.[flag] === true;
  return advertised && ["pauseRecording", "resumeRecording", "stopRecording", "readRecording", "getRecordingState", "acknowledgeRecording"].every((method) => typeof root?.[namespace]?.[method] === "function");
}
function recordingIntentSupported(namespace) {
  const root = getCraftRoot();
  const flag = namespace === "location" ? "locationRecordingIntentIdentity" : "heartRateRecordingIntentIdentity";
  const caps = root?.capabilities;
  const advertised = Array.isArray(caps) ? caps.includes(flag) : caps?.[flag] === true;
  return advertised && recordingOwnershipSupported(namespace) && typeof root?.[namespace]?.startRecording === "function";
}
function recordingPowerModeSupported() {
  const root = getCraftRoot();
  const caps = root?.capabilities;
  const advertised = Array.isArray(caps) ? caps.includes("locationRecordingPowerMode") : caps?.locationRecordingPowerMode === true;
  return advertised && recordingOwnershipSupported("location") && typeof root?.location?.setRecordingPowerMode === "function";
}
function validatePowerMode(value) {
  if (typeof value !== "string" || !RECORDING_POWER_MODES.includes(value))
    throw Object.assign(new Error("powerMode must be 'default', 'saver' or 'auto'"), { code: "INVALID_ARGUMENT" });
  return value;
}
function validateRecordingPowerStart(options) {
  if (!Object.prototype.hasOwnProperty.call(options, "powerMode") || options.powerMode === undefined)
    return;
  if (validatePowerMode(options.powerMode) === "auto" && getCraftRoot() && !recordingPowerModeSupported())
    throw Object.assign(new Error("This app build cannot start a recording in powerMode 'auto'"), { code: "RECORDING_POWER_MODE_UNSUPPORTED" });
}
function validateRecordingStart(namespace, options) {
  if (!Object.prototype.hasOwnProperty.call(options, "recordingId"))
    return;
  if (typeof options.recordingId !== "string" || !options.recordingId.trim())
    throw Object.assign(new Error("recordingId must be a nonempty recording ID"), { code: "INVALID_ARGUMENT" });
  if (!recordingIntentSupported(namespace))
    throw Object.assign(new Error("This app build cannot start the persisted recording intent"), { code: "RECORDING_INTENT_IDENTITY_UNSUPPORTED" });
}
function verifyRecordingStart(options, result) {
  if (options.recordingId !== undefined && result.id !== options.recordingId)
    throw Object.assign(new Error("The native recording does not match the persisted intent"), { code: "RECORDING_CONFLICT" });
  return result;
}
function validateRecordingOwnership(namespace, options) {
  if (!options || !Object.prototype.hasOwnProperty.call(options, "expectedId"))
    return;
  if (typeof options.expectedId !== "string" || !options.expectedId.trim())
    throw Object.assign(new Error("expectedId must be a nonempty recording ID"), { code: "INVALID_ARGUMENT" });
  if ((getCraftRoot() || namespace === "heartRate") && !recordingOwnershipSupported(namespace))
    throw Object.assign(new Error("This app build cannot enforce recording ownership"), { code: "RECORDING_OWNERSHIP_UNSUPPORTED" });
  if (namespace === "location" && !getCraftRoot() && options.expectedId !== webLocationRecording.id)
    throw Object.assign(new Error("The active location recording has changed"), { code: "RECORDING_CONFLICT" });
}
var webLocationRecording = {
  id: null,
  active: false,
  paused: false,
  startedAt: null,
  locations: []
};
var webLocationPowerMode = "default";
function webLocationRecordingState() {
  return {
    ...webLocationRecording,
    sampleCount: webLocationRecording.locations.length,
    powerMode: webLocationPowerMode,
    effectivePowerMode: webLocationRecording.active && webLocationPowerMode === "saver" ? "saver" : "default"
  };
}
var webLocationRecordingWatchId = null;
var location = {
  supportsRecordingOwnership: () => recordingOwnershipSupported("location"),
  supportsRecordingIntentIdentity: () => recordingIntentSupported("location"),
  supportsRecordingPowerMode: () => recordingPowerModeSupported(),
  async getCurrentPosition(options = {}) {
    const craft = getCraftMobile();
    if (typeof window !== "undefined" && craft?.location) {
      return craft.location.getCurrentPosition(options);
    }
    return new Promise((resolve, reject) => {
      navigator.geolocation.getCurrentPosition((pos) => resolve({
        latitude: pos.coords.latitude,
        longitude: pos.coords.longitude,
        altitude: pos.coords.altitude ?? undefined,
        accuracy: pos.coords.accuracy,
        heading: pos.coords.heading ?? undefined,
        speed: pos.coords.speed ?? undefined,
        timestamp: pos.timestamp
      }), reject, {
        enableHighAccuracy: options.enableHighAccuracy,
        timeout: options.timeout,
        maximumAge: options.maximumAge
      });
    });
  },
  watchPosition(callback, options = {}) {
    const craft = getCraftMobile();
    if (typeof window !== "undefined" && craft?.location) {
      return craft.location.watchPosition(callback, options);
    }
    return navigator.geolocation.watchPosition((pos) => callback({
      latitude: pos.coords.latitude,
      longitude: pos.coords.longitude,
      altitude: pos.coords.altitude ?? undefined,
      accuracy: pos.coords.accuracy,
      heading: pos.coords.heading ?? undefined,
      speed: pos.coords.speed ?? undefined,
      timestamp: pos.timestamp
    }), console.error, {
      enableHighAccuracy: options.enableHighAccuracy,
      timeout: options.timeout,
      maximumAge: options.maximumAge
    });
  },
  clearWatch(watchId) {
    const craft = getCraftMobile();
    if (typeof window !== "undefined" && craft?.location) {
      return craft.location.clearWatch(watchId);
    }
    navigator.geolocation.clearWatch(watchId);
  },
  async startRecording(options = {}) {
    validateRecordingStart("location", options);
    validateRecordingPowerStart(options);
    const craft = getCraftMobile();
    if (typeof window !== "undefined" && craft?.location?.startRecording)
      return verifyRecordingStart(options, await craft.location.startRecording(options));
    if (webLocationRecording.active)
      throw Object.assign(new Error("A location recording is already active"), { code: "RECORDING_ALREADY_ACTIVE" });
    if (webLocationRecordingWatchId !== null)
      navigator.geolocation.clearWatch(webLocationRecordingWatchId);
    webLocationRecording = {
      id: secureUUID(),
      active: true,
      paused: false,
      startedAt: Date.now(),
      locations: []
    };
    webLocationPowerMode = options.powerMode ?? "default";
    webLocationRecordingWatchId = location.watchPosition((position) => {
      if (!webLocationRecording.paused)
        webLocationRecording.locations.push(position);
    }, options);
    return webLocationRecordingState();
  },
  async setRecordingPowerMode(options) {
    if (!options || !Object.prototype.hasOwnProperty.call(options, "expectedId"))
      throw Object.assign(new Error("setRecordingPowerMode needs expectedId"), { code: "INVALID_ARGUMENT" });
    validateRecordingOwnership("location", options);
    const powerMode = validatePowerMode(options.powerMode);
    if (getCraftRoot() && !recordingPowerModeSupported())
      throw Object.assign(new Error("This app build cannot change the recording power mode"), { code: "RECORDING_POWER_MODE_UNSUPPORTED" });
    const craft = getCraftMobile();
    if (typeof window !== "undefined" && craft?.location?.setRecordingPowerMode)
      return craft.location.setRecordingPowerMode({ expectedId: options.expectedId, powerMode });
    if (!webLocationRecording.active)
      throw Object.assign(new Error("No active location recording"), { code: "NO_ACTIVE_RECORDING" });
    webLocationPowerMode = powerMode;
    return webLocationRecordingState();
  },
  async pauseRecording(options) {
    validateRecordingOwnership("location", options);
    const craft = getCraftMobile();
    if (typeof window !== "undefined" && craft?.location?.pauseRecording)
      return craft.location.pauseRecording(options);
    webLocationRecording.paused = true;
    return webLocationRecordingState();
  },
  async resumeRecording(options) {
    validateRecordingOwnership("location", options);
    const craft = getCraftMobile();
    if (typeof window !== "undefined" && craft?.location?.resumeRecording)
      return craft.location.resumeRecording(options);
    webLocationRecording.paused = false;
    return webLocationRecordingState();
  },
  async stopRecording(options) {
    validateRecordingOwnership("location", options);
    const craft = getCraftMobile();
    if (typeof window !== "undefined" && craft?.location?.stopRecording)
      return craft.location.stopRecording(options);
    if (webLocationRecordingWatchId !== null) {
      location.clearWatch(webLocationRecordingWatchId);
      webLocationRecordingWatchId = null;
    }
    webLocationRecording.active = false;
    webLocationRecording.paused = false;
    return { ...webLocationRecordingState(), locations: [...webLocationRecording.locations] };
  },
  async getRecordingState(options) {
    validateRecordingOwnership("location", options);
    const craft = getCraftMobile();
    if (typeof window !== "undefined" && craft?.location?.getRecordingState)
      return craft.location.getRecordingState(options);
    return webLocationRecordingState();
  },
  async acknowledgeRecording(options) {
    if (!options || !Object.prototype.hasOwnProperty.call(options, "expectedId"))
      throw Object.assign(new Error("Acknowledgement needs expectedId"), { code: "INVALID_ARGUMENT" });
    validateRecordingOwnership("location", options);
    const craft = getCraftMobile();
    if (craft?.location?.acknowledgeRecording)
      return craft.location.acknowledgeRecording(options);
    if (webLocationRecording.active)
      throw Object.assign(new Error("The recording is still active"), { code: "RECORDING_ALREADY_ACTIVE" });
    webLocationRecording = { id: null, active: false, paused: false, startedAt: null, locations: [] };
    webLocationPowerMode = "default";
    return true;
  },
  async readRecording(options) {
    validateRecordingOwnership("location", options);
    const craft = getCraftMobile();
    if (typeof window !== "undefined" && craft?.location?.readRecording)
      return craft.location.readRecording(options);
    const since = options?.since;
    return typeof since === "number" && Number.isFinite(since) ? webLocationRecording.locations.filter((location) => location.timestamp > since) : [...webLocationRecording.locations];
  }
};
var share = {
  async share(options) {
    const craft = getCraftMobile();
    if (typeof window !== "undefined" && craft?.share) {
      return craft.share.share(options);
    }
    if (navigator.share) {
      try {
        await navigator.share({
          title: options.title,
          text: options.text,
          url: options.url
        });
        return true;
      } catch (error) {
        if (error instanceof DOMException && error.name === "AbortError")
          return false;
        throw error;
      }
    } else {
      throw new Error("Share API not available");
    }
  },
  isAvailable() {
    const craft = getCraftMobile();
    if (typeof window !== "undefined" && craft?.share) {
      return true;
    }
    return "share" in navigator;
  }
};
var lifecycle = {
  getState() {
    const craft = getCraftMobile();
    if (typeof window !== "undefined" && craft?.lifecycle) {
      return craft.lifecycle.getState();
    }
    return document.visibilityState === "visible" ? "active" : "background";
  },
  onStateChange(callback) {
    const craft = getCraftMobile();
    if (typeof window !== "undefined" && craft?.lifecycle) {
      return craft.lifecycle.onStateChange(callback);
    }
    const handler = () => {
      callback(document.visibilityState === "visible" ? "active" : "background");
    };
    document.addEventListener("visibilitychange", handler);
    return () => document.removeEventListener("visibilitychange", handler);
  },
  onResume(callback) {
    return onCraftEvent("craftResume", (detail) => callback({ backgroundedMs: Number(detail.backgroundedMs) || 0 }));
  },
  onMemoryWarning(callback) {
    return onCraftEvent("craftMemoryWarning", () => callback());
  }
};
function bridgeNotification(options, now = Date.now()) {
  const { scheduleAt, ...rest } = options;
  if (scheduleAt === undefined)
    return rest;
  const wait = Math.ceil(scheduleAt - now);
  return wait > 0 ? { ...rest, delay: wait } : rest;
}
var notifications = {
  async show(options) {
    const craft = getCraftMobile();
    if (typeof window !== "undefined" && craft?.notifications) {
      return craft.notifications.show(options);
    }
    if ("Notification" in window && Notification.permission === "granted") {
      new Notification(options.title, { body: options.body });
    }
  },
  async schedule(options) {
    const craft = getCraftMobile();
    if (typeof window !== "undefined" && craft?.notifications) {
      return craft.notifications.schedule(bridgeNotification(options));
    }
    throw new Error("Scheduled notifications not available in web");
  },
  async cancel(id) {
    const craft = getCraftMobile();
    if (typeof window !== "undefined" && craft?.notifications) {
      return craft.notifications.cancel(id);
    }
    throw new Error("Scheduled notifications not available in web");
  },
  async pending() {
    const craft = getCraftMobile();
    if (typeof window !== "undefined" && craft?.notifications) {
      return craft.notifications.pending();
    }
    return [];
  },
  async cancelAll() {
    const craft = getCraftMobile();
    if (typeof window !== "undefined" && craft?.notifications) {
      return craft.notifications.cancelAll();
    }
  },
  async setBadge(count) {
    const craft = getCraftMobile();
    if (typeof window !== "undefined" && craft?.notifications) {
      return craft.notifications.setBadge(count);
    }
  }
};
var webWakeLock = null;
var keepAwake = {
  async enable() {
    const craft = getCraftRoot();
    if (craft?.setKeepAwake) {
      await craft.setKeepAwake(true);
      return;
    }
    const wakeLock = navigator.wakeLock;
    webWakeLock = await wakeLock?.request("screen") ?? null;
  },
  async disable() {
    const craft = getCraftRoot();
    if (craft?.setKeepAwake) {
      await craft.setKeepAwake(false);
      return;
    }
    await webWakeLock?.release();
    webWakeLock = null;
  }
};
function getWebSpeech() {
  if (typeof window === "undefined")
    return;
  const scope = window;
  if (!scope.speechSynthesis || typeof scope.SpeechSynthesisUtterance !== "function")
    return;
  return { synthesis: scope.speechSynthesis, Utterance: scope.SpeechSynthesisUtterance };
}
var speakingOnTheWeb = new Set;
function speechRate(rate) {
  return typeof rate === "number" && Number.isFinite(rate) ? Math.min(Math.max(rate, 0.5), 2) : 1;
}
var brightnessState = { original: null, wanted: null, unwatch: null };
function brightnessLevel(level) {
  const value = Number(level);
  return Number.isFinite(value) ? Math.min(1, Math.max(0, value)) : null;
}
async function putBrightnessBack(craft) {
  if (typeof craft?.resetBrightness === "function")
    await craft.resetBrightness();
  else if (brightnessState.original !== null)
    await craft.setBrightness(brightnessState.original);
}
function watchBrightnessVisibility() {
  if (brightnessState.unwatch || typeof document === "undefined")
    return;
  const onVisibility = () => {
    const craft = getCraftRoot();
    if (!craft?.setBrightness || brightnessState.wanted === null)
      return;
    if (document.visibilityState === "hidden")
      putBrightnessBack(craft).catch(() => {});
    else
      craft.setBrightness(brightnessState.wanted).catch(() => {});
  };
  document.addEventListener("visibilitychange", onVisibility);
  brightnessState.unwatch = () => document.removeEventListener("visibilitychange", onVisibility);
}
var brightness = {
  isAvailable() {
    return typeof getCraftRoot()?.setBrightness === "function";
  },
  async get() {
    const craft = getCraftRoot();
    if (typeof craft?.getBrightness !== "function")
      return null;
    return brightnessLevel(await craft.getBrightness());
  },
  async set(level) {
    const craft = getCraftRoot();
    const wanted = brightnessLevel(level);
    if (typeof craft?.setBrightness !== "function" || wanted === null)
      return null;
    if (brightnessState.wanted === null && typeof craft.getBrightness === "function")
      brightnessState.original = brightnessLevel(await craft.getBrightness());
    brightnessState.wanted = wanted;
    watchBrightnessVisibility();
    return brightnessLevel(await craft.setBrightness(wanted));
  },
  async restore() {
    const craft = getCraftRoot();
    const held = brightnessState.wanted !== null;
    brightnessState.wanted = null;
    brightnessState.unwatch?.();
    brightnessState.unwatch = null;
    if (held && typeof craft?.setBrightness === "function")
      await putBrightnessBack(craft);
    brightnessState.original = null;
  }
};
var speech = {
  isAvailable() {
    return Boolean(getCraftRoot()?.speech?.speak) || getWebSpeech() !== undefined;
  },
  async speak(text, options = {}) {
    const native = getCraftRoot()?.speech;
    const web = native?.speak ? undefined : getWebSpeech();
    if (!native?.speak && !web)
      return false;
    if (typeof text !== "string" || !text.trim()) {
      throw Object.assign(new Error("speech.speak needs some text to say"), { code: "INVALID_ARGUMENT" });
    }
    if (native?.speak)
      return await native.speak(text, options) === true;
    const { synthesis, Utterance } = web;
    if (options.interrupt !== false)
      synthesis.cancel();
    return new Promise((resolve) => {
      const utterance = new Utterance(text);
      utterance.rate = speechRate(options.rate);
      utterance.pitch = speechRate(options.pitch);
      if (options.language)
        utterance.lang = options.language;
      const settle = (spoken) => {
        speakingOnTheWeb.delete(utterance);
        resolve(spoken);
      };
      utterance.onend = () => settle(true);
      utterance.onerror = () => settle(false);
      speakingOnTheWeb.add(utterance);
      try {
        synthesis.speak(utterance);
      } catch {
        settle(false);
      }
    });
  },
  async stop() {
    const native = getCraftRoot()?.speech;
    if (native?.stop) {
      await native.stop();
      return;
    }
    getWebSpeech()?.synthesis.cancel();
  }
};
function crashReporterBridge() {
  const root = globalThis.craft;
  return root?.crashReporter && typeof root.crashReporter.capture === "function" ? root.crashReporter : undefined;
}
var crashReporter = {
  isAvailable() {
    const root = globalThis.craft;
    if (!crashReporterBridge())
      return false;
    const caps = root?.capabilities;
    if (Array.isArray(caps))
      return caps.includes("crashReporter");
    return caps?.crashReporter !== false;
  },
  async capture(event) {
    const bridge = crashReporterBridge();
    if (!bridge || !event || typeof event.message !== "string")
      return false;
    try {
      return await bridge.capture(event) !== false;
    } catch {
      return false;
    }
  },
  async setUser(id) {
    const bridge = crashReporterBridge();
    if (!bridge)
      return false;
    try {
      return await bridge.setUser(id == null ? null : String(id)) !== false;
    } catch {
      return false;
    }
  },
  async addBreadcrumb(breadcrumb) {
    const bridge = crashReporterBridge();
    if (!bridge)
      return false;
    try {
      return await bridge.addBreadcrumb(breadcrumb) !== false;
    } catch {
      return false;
    }
  },
  async flush() {
    const bridge = crashReporterBridge();
    if (!bridge)
      return false;
    try {
      return await bridge.flush() !== false;
    } catch {
      return false;
    }
  },
  async context() {
    const bridge = crashReporterBridge();
    if (!bridge)
      return null;
    try {
      return await bridge.context();
    } catch {
      return null;
    }
  }
};
var MUSIC_AUTHORIZATIONS = ["authorized", "denied", "restricted", "notDetermined", "unavailable"];
var MUSIC_STATES = ["stopped", "playing", "paused", "interrupted", "seekingForward", "seekingBackward", "unknown"];
function musicAuthorization(value) {
  return MUSIC_AUTHORIZATIONS.includes(value) ? value : "unavailable";
}
function musicText(value) {
  return typeof value === "string" && value.trim() ? value : null;
}
function musicSeconds(value) {
  return typeof value === "number" && Number.isFinite(value) && value >= 0 ? value : null;
}
function normalizeNowPlaying(value) {
  const raw = value && typeof value === "object" ? value : {};
  const playbackState = MUSIC_STATES.includes(raw.playbackState) ? raw.playbackState : "unknown";
  const artwork = musicText(raw.artworkDataURL);
  return {
    available: raw.available !== false && Object.keys(raw).length > 0,
    authorization: musicAuthorization(raw.authorization),
    source: raw.source === "appleMusic" || raw.source === "simulated" ? raw.source : null,
    playbackState,
    isPlaying: raw.isPlaying === true,
    itemId: musicText(raw.itemId),
    title: musicText(raw.title),
    artist: musicText(raw.artist),
    album: musicText(raw.album),
    duration: musicSeconds(raw.duration),
    position: musicSeconds(raw.position),
    artworkDataURL: artwork && artwork.startsWith("data:image/") ? artwork : null,
    otherAudioPlaying: raw.otherAudioPlaying === true,
    timestamp: typeof raw.timestamp === "number" && Number.isFinite(raw.timestamp) ? raw.timestamp : Date.now()
  };
}
function nothingPlaying() {
  return normalizeNowPlaying({ available: false, authorization: "unavailable" });
}
function nativeMusic() {
  const craft = getCraftRoot();
  if (!craft?.music || craft.capabilities?.music === false)
    return;
  return craft.music;
}
var musicWatch = { listeners: new Set, stop: null };
function startMusicWatch(native) {
  if (musicWatch.stop || typeof window === "undefined")
    return;
  const onChange = (event) => {
    const nowPlaying = normalizeNowPlaying(event.detail);
    for (const listener of [...musicWatch.listeners]) {
      try {
        listener(nowPlaying);
      } catch {}
    }
  };
  window.addEventListener("craftMusicChange", onChange);
  Promise.resolve(native.observe?.(true)).catch(() => {});
  musicWatch.stop = () => {
    window.removeEventListener("craftMusicChange", onChange);
    Promise.resolve(native.observe?.(false)).catch(() => {});
  };
}
async function musicCommand(method, options) {
  const native = nativeMusic();
  if (typeof native?.[method] !== "function")
    return nothingPlaying();
  return normalizeNowPlaying(await native[method](options));
}
var music = {
  isAvailable() {
    return typeof nativeMusic()?.getNowPlaying === "function";
  },
  supports(method) {
    return typeof nativeMusic()?.[method] === "function";
  },
  async getAuthorizationStatus() {
    const native = nativeMusic();
    if (typeof native?.getAuthorizationStatus !== "function")
      return "unavailable";
    return musicAuthorization(await native.getAuthorizationStatus());
  },
  async requestAuthorization() {
    const native = nativeMusic();
    if (typeof native?.requestAuthorization !== "function")
      return "unavailable";
    return musicAuthorization(await native.requestAuthorization());
  },
  async getNowPlaying() {
    const native = nativeMusic();
    if (typeof native?.getNowPlaying !== "function")
      return nothingPlaying();
    return normalizeNowPlaying(await native.getNowPlaying());
  },
  play: () => musicCommand("play"),
  pause: () => musicCommand("pause"),
  togglePlayPause: () => musicCommand("togglePlayPause"),
  skipToNext: () => musicCommand("skipToNext"),
  skipToPrevious: (options = {}) => musicCommand("skipToPrevious", options),
  onChange(callback) {
    const native = nativeMusic();
    if (typeof native?.observe !== "function")
      return () => {};
    musicWatch.listeners.add(callback);
    startMusicWatch(native);
    return () => {
      if (!musicWatch.listeners.delete(callback) || musicWatch.listeners.size > 0)
        return;
      musicWatch.stop?.();
      musicWatch.stop = null;
    };
  }
};
var HR_AUTHORIZATIONS = ["authorized", "denied", "restricted", "notDetermined", "unavailable"];
var HR_BLUETOOTH = ["poweredOn", "poweredOff", "unauthorized", "unsupported", "resetting", "unknown"];
var HR_CONNECTIONS = ["disconnected", "connecting", "connected", "reconnecting"];
function hrRecord(value) {
  return value && typeof value === "object" && !Array.isArray(value) ? value : {};
}
function hrNumber(value) {
  return typeof value === "number" && Number.isFinite(value) ? value : null;
}
function hrBpm(value) {
  const bpm = hrNumber(value);
  return bpm !== null && bpm >= 20 && bpm <= 250 ? Math.round(bpm) : null;
}
function hrIntervals(value) {
  return Array.isArray(value) ? value.filter((ms) => typeof ms === "number" && Number.isFinite(ms) && ms > 0 && ms < 5000) : [];
}
function normalizeHeartRateDevice(value) {
  const raw = hrRecord(value);
  if (typeof raw.id !== "string" || !raw.id)
    return null;
  return { id: raw.id, name: typeof raw.name === "string" && raw.name.trim() ? raw.name : "Heart rate monitor", rssi: hrNumber(raw.rssi) };
}
function normalizeHeartRateRecording(value) {
  const raw = hrRecord(value);
  return {
    id: typeof raw.id === "string" ? raw.id : null,
    active: raw.active === true,
    paused: raw.paused === true,
    startedAt: hrNumber(raw.startedAt),
    sampleCount: hrNumber(raw.sampleCount)
  };
}
function normalizeHeartRateState(value) {
  const raw = hrRecord(value);
  return {
    available: raw.available !== false && Object.keys(raw).length > 0,
    bluetooth: HR_BLUETOOTH.includes(raw.bluetooth) ? raw.bluetooth : "unknown",
    authorization: HR_AUTHORIZATIONS.includes(raw.authorization) ? raw.authorization : "unavailable",
    scanning: raw.scanning === true,
    connection: HR_CONNECTIONS.includes(raw.connection) ? raw.connection : "disconnected",
    device: normalizeHeartRateDevice(raw.device),
    lastDevice: normalizeHeartRateDevice(raw.lastDevice),
    bpm: hrBpm(raw.bpm),
    lastReadingAt: hrNumber(raw.lastReadingAt),
    recording: normalizeHeartRateRecording(raw.recording)
  };
}
function normalizeHeartRateReading(value) {
  const raw = hrRecord(value);
  const bpm = hrBpm(raw.bpm);
  if (bpm === null)
    return null;
  return {
    bpm,
    rrIntervals: hrIntervals(raw.rrIntervals),
    contact: typeof raw.contact === "boolean" ? raw.contact : null,
    energyExpended: hrNumber(raw.energyExpended),
    timestamp: hrNumber(raw.timestamp) ?? Date.now(),
    deviceId: typeof raw.deviceId === "string" ? raw.deviceId : null
  };
}
function normalizeHeartRateSamples(value) {
  if (!Array.isArray(value))
    return [];
  const seen = new Set;
  const samples = [];
  for (const item of value) {
    const raw = hrRecord(item);
    const timestamp = hrNumber(raw.timestamp);
    const bpm = hrBpm(raw.bpm);
    if (timestamp === null || bpm === null || seen.has(timestamp))
      continue;
    seen.add(timestamp);
    const rr = hrIntervals(raw.rr);
    samples.push(rr.length ? { timestamp, bpm, rr } : { timestamp, bpm });
  }
  return samples.sort((a, b) => a.timestamp - b.timestamp);
}
function noHeartRate() {
  return normalizeHeartRateState({ available: false });
}
function nativeHeartRate() {
  const craft = getCraftRoot();
  if (!craft?.heartRate || craft.capabilities?.heartRate === false)
    return;
  return craft.heartRate;
}
var heartRateWatch = { readings: new Set, devices: new Set, states: new Set, stop: null };
function hrNotify(listeners, value) {
  for (const listener of [...listeners]) {
    try {
      listener(value);
    } catch {}
  }
}
function hrSubscribe(set, callback) {
  if (!nativeHeartRate() || typeof window === "undefined")
    return () => {};
  set.add(callback);
  if (!heartRateWatch.stop) {
    const onEvent = (event) => {
      const detail = hrRecord(event.detail);
      if (detail.type === "reading") {
        const reading = normalizeHeartRateReading(detail);
        if (reading)
          hrNotify(heartRateWatch.readings, reading);
      } else if (detail.type === "device") {
        const device = normalizeHeartRateDevice(detail.device);
        if (device)
          hrNotify(heartRateWatch.devices, device);
      } else if (detail.type === "state") {
        hrNotify(heartRateWatch.states, normalizeHeartRateState(detail));
      }
    };
    window.addEventListener("craftHeartRate", onEvent);
    heartRateWatch.stop = () => window.removeEventListener("craftHeartRate", onEvent);
  }
  return () => {
    if (!set.delete(callback))
      return;
    if (heartRateWatch.readings.size + heartRateWatch.devices.size + heartRateWatch.states.size > 0)
      return;
    heartRateWatch.stop?.();
    heartRateWatch.stop = null;
  };
}
async function heartRateCall(method, fallback, normalize, ...args) {
  const native = nativeHeartRate();
  if (typeof native?.[method] !== "function")
    return fallback();
  return normalize(await native[method](...args));
}
var noRecording = () => normalizeHeartRateRecording({});
var heartRate = {
  supportsRecordingOwnership: () => recordingOwnershipSupported("heartRate"),
  supportsRecordingIntentIdentity: () => recordingIntentSupported("heartRate"),
  isAvailable() {
    return typeof nativeHeartRate()?.getState === "function";
  },
  supports(method) {
    return typeof nativeHeartRate()?.[method] === "function";
  },
  getState: () => heartRateCall("getState", noHeartRate, normalizeHeartRateState),
  requestAuthorization: () => heartRateCall("requestAuthorization", () => "unavailable", (value) => HR_AUTHORIZATIONS.includes(value) ? value : "unavailable"),
  scan: (options = {}) => heartRateCall("scan", noHeartRate, normalizeHeartRateState, options),
  stopScan: () => heartRateCall("stopScan", noHeartRate, normalizeHeartRateState),
  getDevices: () => heartRateCall("getDevices", () => [], (value) => Array.isArray(value) ? value.map(normalizeHeartRateDevice).filter((device) => device !== null) : []),
  connect: (id) => heartRateCall("connect", noHeartRate, normalizeHeartRateState, id),
  reconnect: () => heartRateCall("reconnect", noHeartRate, normalizeHeartRateState),
  disconnect: (options = {}) => heartRateCall("disconnect", noHeartRate, normalizeHeartRateState, options),
  async startRecording(options) {
    const supplied = options ?? {};
    validateRecordingStart("heartRate", supplied);
    return verifyRecordingStart(supplied, await heartRateCall("startRecording", noRecording, normalizeHeartRateRecording, ...options === undefined ? [] : [options]));
  },
  async pauseRecording(options) {
    validateRecordingOwnership("heartRate", options);
    return heartRateCall("pauseRecording", noRecording, normalizeHeartRateRecording, ...options === undefined ? [] : [options]);
  },
  async resumeRecording(options) {
    validateRecordingOwnership("heartRate", options);
    return heartRateCall("resumeRecording", noRecording, normalizeHeartRateRecording, ...options === undefined ? [] : [options]);
  },
  async stopRecording(options) {
    validateRecordingOwnership("heartRate", options);
    return heartRateCall("stopRecording", () => ({ ...noRecording(), samples: [] }), (value) => ({ ...normalizeHeartRateRecording(value), samples: normalizeHeartRateSamples(hrRecord(value).samples) }), ...options === undefined ? [] : [options]);
  },
  async getRecordingState(options) {
    validateRecordingOwnership("heartRate", options);
    return heartRateCall("getRecordingState", noRecording, normalizeHeartRateRecording, ...options === undefined ? [] : [options]);
  },
  async acknowledgeRecording(options) {
    if (!options || !Object.prototype.hasOwnProperty.call(options, "expectedId"))
      throw Object.assign(new Error("Acknowledgement needs expectedId"), { code: "INVALID_ARGUMENT" });
    validateRecordingOwnership("heartRate", options);
    return heartRateCall("acknowledgeRecording", () => false, (value) => value === true, options);
  },
  async readRecording(options = {}) {
    validateRecordingOwnership("heartRate", options);
    return heartRateCall("readRecording", () => [], normalizeHeartRateSamples, options);
  },
  onReading: (callback) => hrSubscribe(heartRateWatch.readings, callback),
  onDevice: (callback) => hrSubscribe(heartRateWatch.devices, callback),
  onState: (callback) => hrSubscribe(heartRateWatch.states, callback)
};
var deepLinks = {
  async getInitialURL() {
    return normalizeDeepLinkURL(await getCraftRoot()?.deepLinks?.getInitialURL?.());
  },
  onLink(callback) {
    const craft = getCraftRoot();
    if (craft?.deepLinks?.onLink) {
      return craft.deepLinks.onLink((value) => {
        const url = normalizeDeepLinkURL(value);
        if (url)
          callback(url, { initial: value?.initial === true });
      }) ?? (() => {});
    }
    if (typeof globalThis === "undefined")
      return () => {};
    const listener = (event) => {
      const detail = event.detail;
      const url = normalizeDeepLinkURL(detail);
      if (url)
        callback(url, { initial: detail?.initial === true });
    };
    globalThis.addEventListener("craftDeepLink", listener);
    return () => globalThis.removeEventListener("craftDeepLink", listener);
  }
};
function normalizeDeepLinkURL(value) {
  if (typeof value === "string")
    return value.trim() || null;
  if (!value || typeof value !== "object")
    return null;
  const url = value.url;
  return typeof url === "string" && url.trim() ? url : null;
}
var network = {
  async getStatus() {
    const craft = getCraftRoot();
    if (craft?.getNetworkStatus)
      return await craft.getNetworkStatus();
    return {
      type: "unknown",
      isConnected: typeof navigator === "undefined" ? false : navigator.onLine
    };
  },
  onChange(callback) {
    const craft = getCraftRoot();
    if (craft?.onNetworkChange) {
      craft.onNetworkChange(callback);
      return () => craft.offNetworkChange?.();
    }
    if (typeof globalThis === "undefined")
      return () => {};
    const listener = () => callback({ type: "unknown", isConnected: navigator.onLine });
    globalThis.addEventListener("online", listener);
    globalThis.addEventListener("offline", listener);
    return () => {
      globalThis.removeEventListener("online", listener);
      globalThis.removeEventListener("offline", listener);
    };
  }
};
function chromeHandler() {
  if (typeof window === "undefined")
    return null;
  const handler = window.webkit?.messageHandlers?.craftChrome;
  return handler && typeof handler.postMessage === "function" ? handler : null;
}
function postChrome(message) {
  const handler = chromeHandler();
  if (!handler)
    return false;
  try {
    handler.postMessage(message);
    return true;
  } catch {
    return false;
  }
}
var tabBar = {
  isAvailable() {
    return chromeHandler() !== null;
  },
  set(tabs, options = {}) {
    return postChrome({ type: "tabBar", tabs, ...options });
  },
  select(id) {
    return postChrome({ type: "selectTab", id });
  },
  hide() {
    return postChrome({ type: "hideTabBar" });
  },
  onSelect(callback) {
    if (typeof window === "undefined")
      return () => {};
    const listener = (event) => {
      const id = event.detail?.id;
      if (typeof id === "string")
        callback(id);
    };
    window.addEventListener("craftTabSelect", listener);
    return () => window.removeEventListener("craftTabSelect", listener);
  }
};
var splash = {
  hide() {
    return postChrome({ type: "ready" });
  }
};
function hybridHandler() {
  if (typeof window === "undefined")
    return null;
  const handler = window.webkit?.messageHandlers?.craftHybrid;
  return handler && typeof handler.postMessage === "function" ? handler : null;
}
function postHybrid(message) {
  const handler = hybridHandler();
  if (!handler)
    return false;
  try {
    handler.postMessage(message);
    return true;
  } catch {
    return false;
  }
}
function isSnapshotName(name) {
  return typeof name === "string" && /^[A-Za-z0-9_-][\w.-]{0,127}$/.test(name);
}
var snapshots = {
  isAvailable() {
    return hybridHandler() !== null;
  },
  set(name, value) {
    if (!isSnapshotName(name))
      throw new TypeError(`Snapshot names are letters, digits, ".", "_" and "-": ${String(name)}`);
    const json = JSON.stringify(value);
    if (json === undefined)
      throw new TypeError(`Snapshot ${name} is not JSON`);
    return postHybrid({ type: "snapshotSet", name, json });
  },
  remove(name) {
    if (!isSnapshotName(name))
      return false;
    return postHybrid({ type: "snapshotRemove", name });
  },
  clear() {
    return postHybrid({ type: "snapshotClear" });
  }
};
var appReview = {
  async request() {
    const craft = getCraftRoot();
    if (!craft?.requestReview)
      return false;
    return Boolean(await craft.requestReview());
  }
};
var pushNotifications = {
  async register() {
    const craft = getCraftRoot();
    if (!craft?.registerPush)
      throw new Error("Push notifications are unavailable");
    return craft.registerPush();
  },
  onToken(callback) {
    return onCraftEvent("craftPushToken", (detail) => callback(String(detail.token ?? "")));
  },
  onNotification(callback) {
    const craft = getCraftRoot();
    if (craft?.notifications?.onTap) {
      return craft.notifications.onTap((detail) => {
        callback(detail ?? {});
      }) ?? (() => {});
    }
    return onCraftEvent("craftNotificationResponse", (detail) => callback(detail));
  },
  onReceive(callback) {
    const craft = getCraftRoot();
    if (craft?.notifications?.onReceive) {
      return craft.notifications.onReceive((detail) => {
        callback(detail ?? {});
      }) ?? (() => {});
    }
    return onCraftEvent("craftNotificationReceived", (detail) => callback(detail));
  }
};
function healthHeartRateSamples(detail) {
  const samples = detail?.samples;
  if (!Array.isArray(samples))
    return [];
  return samples.filter((sample) => typeof sample?.bpm === "number" && Number.isFinite(sample.bpm) && typeof sample.startDate === "number" && typeof sample.endDate === "number");
}
var health = {
  supports(method) {
    return typeof getCraftRoot()?.health?.[method] === "function";
  },
  async requestAuthorization(types, options = {}) {
    const craft = getCraftRoot();
    if (!craft?.health?.requestAuthorization)
      throw new Error("Health data is unavailable");
    return Boolean(await craft.health.requestAuthorization(types, options));
  },
  async getData(type, options = {}) {
    const craft = getCraftRoot();
    if (!craft?.health?.getData)
      throw new Error("Health data is unavailable");
    return craft.health.getData(type, options);
  },
  async saveData(type, value, options = {}) {
    const craft = getCraftRoot();
    if (!craft?.health?.saveData)
      throw new Error("Saving health data is unavailable");
    return craft.health.saveData(type, value, options);
  },
  async saveWorkout(workout) {
    const craft = getCraftRoot();
    if (!craft?.health?.saveWorkout)
      throw new Error("Saving health workouts is unavailable");
    return craft.health.saveWorkout(workout);
  },
  async getWorkouts(options = {}) {
    const craft = getCraftRoot();
    if (!craft?.health?.getWorkouts)
      throw new Error("Reading health workouts is unavailable");
    return craft.health.getWorkouts(options);
  },
  async getDailyStatistics(type, options = {}) {
    const craft = getCraftRoot();
    if (!craft?.health?.getDailyStatistics)
      throw new Error("Daily health statistics are unavailable");
    return craft.health.getDailyStatistics(type, options);
  },
  async getHeartRateSamples(options = {}) {
    const craft = getCraftRoot();
    if (!craft?.health?.getHeartRateSamples)
      throw new Error("Reading heart-rate samples is unavailable");
    return craft.health.getHeartRateSamples(options);
  },
  async getSamples(type, options = {}) {
    const craft = getCraftRoot();
    if (!craft?.health?.getSamples)
      throw new Error("Reading health samples is unavailable");
    return craft.health.getSamples(type, options);
  },
  async getSleepIntervals(options = {}) {
    const craft = getCraftRoot();
    if (!craft?.health?.getSleepIntervals)
      throw new Error("Reading sleep intervals is unavailable");
    return craft.health.getSleepIntervals(options);
  },
  async saveMindfulSession(session) {
    const craft = getCraftRoot();
    if (!craft?.health?.saveMindfulSession)
      throw new Error("Saving mindful sessions is unavailable");
    return craft.health.saveMindfulSession(session);
  },
  async getMindfulSessions(options = {}) {
    const craft = getCraftRoot();
    if (!craft?.health?.getMindfulSessions)
      throw new Error("Reading mindful sessions is unavailable");
    return craft.health.getMindfulSessions(options);
  },
  async startHeartRateUpdates(options = {}) {
    const craft = getCraftRoot();
    if (!craft?.health?.startHeartRateUpdates)
      throw new Error("Heart-rate updates are unavailable");
    return Boolean(await craft.health.startHeartRateUpdates(options));
  },
  async stopHeartRateUpdates() {
    const craft = getCraftRoot();
    if (!craft?.health?.stopHeartRateUpdates)
      throw new Error("Heart-rate updates are unavailable");
    return Boolean(await craft.health.stopHeartRateUpdates());
  },
  async startWorkout(options) {
    const craft = getCraftRoot();
    if (!craft?.health?.startWorkout)
      throw new Error("Live workouts are unavailable");
    return craft.health.startWorkout(options);
  },
  async pauseWorkout() {
    const craft = getCraftRoot();
    if (!craft?.health?.pauseWorkout)
      throw new Error("Live workouts are unavailable");
    return Boolean(await craft.health.pauseWorkout());
  },
  async resumeWorkout() {
    const craft = getCraftRoot();
    if (!craft?.health?.resumeWorkout)
      throw new Error("Live workouts are unavailable");
    return Boolean(await craft.health.resumeWorkout());
  },
  async endWorkout() {
    const craft = getCraftRoot();
    if (!craft?.health?.endWorkout)
      throw new Error("Live workouts are unavailable");
    return craft.health.endWorkout();
  },
  async discardWorkout() {
    const craft = getCraftRoot();
    if (!craft?.health?.discardWorkout)
      throw new Error("Discarding live workouts is unavailable");
    return Boolean(await craft.health.discardWorkout());
  },
  onWorkout(callback) {
    if (typeof window === "undefined" || typeof getCraftRoot()?.health?.startWorkout !== "function")
      return () => {};
    const listener = (event) => {
      const detail = event.detail;
      if (detail && typeof detail.id === "string" && (detail.event === "state" || detail.event === "metrics" || detail.event === "error"))
        callback(detail);
    };
    window.addEventListener("craftHealthWorkout", listener);
    return () => window.removeEventListener("craftHealthWorkout", listener);
  },
  onHeartRate(callback) {
    if (typeof window === "undefined" || typeof getCraftRoot()?.health?.startHeartRateUpdates !== "function")
      return () => {};
    const listener = (event) => {
      const samples = healthHeartRateSamples(event.detail);
      if (samples.length)
        callback(samples);
    };
    window.addEventListener("craftHealthHeartRate", listener);
    return () => window.removeEventListener("craftHealthHeartRate", listener);
  }
};
async function updateLiveActivity(idOrState, state) {
  const craft = getCraftRoot();
  if (!craft?.liveActivity?.update)
    return;
  if (typeof idOrState === "string") {
    await craft.liveActivity.update(idOrState, state ?? {});
    return;
  }
  await craft.liveActivity.update(idOrState);
}
async function endLiveActivity(id, finalState) {
  const craft = getCraftRoot();
  if (!craft?.liveActivity?.end)
    return;
  if (id !== undefined) {
    await craft.liveActivity.end(id, finalState);
    return;
  }
  await craft.liveActivity.end();
}
var liveActivities = {
  async isAvailable() {
    return Boolean(await getCraftRoot()?.liveActivity?.isAvailable?.());
  },
  async list() {
    return await getCraftRoot()?.liveActivity?.list?.() ?? [];
  },
  async start(options) {
    const craft = getCraftRoot();
    if (!craft?.liveActivity?.start)
      throw new Error("Live Activities are unavailable");
    const result = await craft.liveActivity.start(options);
    if (!result || typeof result.id !== "string" || result.id.length === 0) {
      throw new Error("Live Activities returned an invalid activity id");
    }
    return createLiveActivityHandle(result.id, (state) => updateLiveActivity(result.id, state), (finalState) => endLiveActivity(result.id, finalState));
  },
  update: updateLiveActivity,
  end: endLiveActivity
};
var watchConnectivity = {
  async send(message) {
    const craft = getCraftRoot();
    if (!craft?.watch?.send)
      throw new Error("Apple Watch connectivity is unavailable");
    return craft.watch.send(message);
  },
  async updateContext(context) {
    const craft = getCraftRoot();
    if (!craft?.watch?.updateContext)
      throw new Error("Apple Watch connectivity is unavailable");
    await craft.watch.updateContext(context);
  },
  async isReachable() {
    const result = await getCraftRoot()?.watch?.isReachable?.();
    return Boolean(result?.reachable);
  },
  onMessage(callback) {
    return onCraftEvent("craftWatchMessage", callback);
  },
  onReachabilityChange(callback) {
    return onCraftEvent("craftWatchReachability", (detail) => callback(Boolean(detail.reachable)));
  }
};
function onCraftEvent(eventName, callback) {
  if (typeof globalThis === "undefined")
    return () => {};
  const listener = (event) => callback(event.detail ?? {});
  globalThis.addEventListener(eventName, listener);
  return () => globalThis.removeEventListener(eventName, listener);
}
function getCraftRoot() {
  if (typeof window === "undefined")
    return;
  return window.craft;
}
function detectPlatform() {
  if (typeof window === "undefined")
    return "linux";
  const ua = navigator.userAgent.toLowerCase();
  if (/iphone|ipad|ipod/.test(ua))
    return "ios";
  if (/android/.test(ua))
    return "android";
  if (/macintosh|mac os x/.test(ua))
    return "macos";
  if (/windows/.test(ua))
    return "windows";
  return "linux";
}
function mapToWebPermission(permission) {
  const mapping = {
    camera: "camera",
    microphone: "microphone",
    location: "geolocation",
    notifications: "notifications"
  };
  return mapping[permission] || null;
}
function mapWebPermissionStatus(state) {
  const mapping = {
    granted: "granted",
    denied: "denied",
    prompt: "undetermined"
  };
  return mapping[state];
}
function getCraftMobile() {
  if (typeof window !== "undefined") {
    return window.craft;
  }
  return;
}

// node_modules/@bughq/sdk/dist/index.js
var B = "bughq.javascript";
var k = "0.3.0";
var O = "https://bughq.org";
function L(n) {
  try {
    let e = new URL(n), t = e.username || e.password || "", r = e.pathname.replace(/^\/+/, "").split("/")[0] || "";
    return r ? { host: `${e.protocol}//${e.host}`, key: t, project: r } : null;
  } catch {
    return null;
  }
}
function $(n) {
  return n === true ? { console: true, fetch: true, xhr: true, dom: true, navigation: true } : n && typeof n == "object" ? { console: n.console === true, fetch: n.fetch === true, xhr: n.xhr === true, dom: n.dom === true, navigation: n.navigation === true } : { console: false, fetch: false, xhr: false, dom: false, navigation: false };
}
function U(n) {
  let { project: e, key: t, host: r } = n;
  if (n.dsn) {
    let s = L(n.dsn);
    s && (r = r ?? s.host, t = t ?? s.key, e = e ?? s.project);
  }
  return { project: e ?? "", key: t ?? "", host: (r ?? O).replace(/\/+$/, ""), release: n.release, environment: n.environment ?? "production", framework: n.framework, sdkName: n.sdkName ?? B, enabled: n.enabled !== false, sampleRate: n.sampleRate ?? 1, dedupeMs: n.dedupeMs ?? 5000, maxBreadcrumbs: n.maxBreadcrumbs ?? 30, captureUnhandled: n.captureUnhandled !== false, captureConsole: n.captureConsole === true, requireLabel: n.requireLabel !== false, vendors: n.vendors === true, heartbeat: n.heartbeat !== false, autoInstrument: $(n.autoInstrument), ignoreErrors: n.ignoreErrors ?? [], denyUrls: n.denyUrls ?? [], allowUrls: n.allowUrls ?? [], maxRetries: n.maxRetries ?? 2, userAgent: n.userAgent, transport: n.transport, offline: { enabled: n.offline !== false, maxEvents: Math.max(1, typeof n.offline == "object" && n.offline.maxEvents || 30), maxAgeMs: Math.max(1, typeof n.offline == "object" && n.offline.maxAgeHours || 72) * 3600000 }, sendDefaultContext: n.sendDefaultContext !== false, debug: !!n.debug, beforeBreadcrumb: n.beforeBreadcrumb, beforeSend: n.beforeSend };
}
function j(n) {
  if (!n)
    return {};
  let e, t = [[/Edg\/(\d+)/, "Edge"], [/OPR\/(\d+)/, "Opera"], [/Firefox\/(\d+)/, "Firefox"], [/Chrome\/(\d+)/, "Chrome"], [/Version\/(\d+)[^S]{0,32}Safari/, "Safari"]];
  for (let [s, i] of t) {
    let o = n.match(s);
    if (o) {
      e = `${i} ${o[1]}`;
      break;
    }
  }
  let r;
  return /Windows NT 10/.test(n) ? r = "Windows 10" : /Windows/.test(n) ? r = "Windows" : /Mac OS X/.test(n) ? r = "macOS" : /Android/.test(n) ? r = "Android" : /iPhone|iPad|iPod|iOS/.test(n) ? r = "iOS" : /Linux/.test(n) && (r = "Linux"), { browser: e, os: r };
}
function H(n) {
  if (n && typeof n == "object") {
    let e = n;
    if (e.name)
      return String(e.name);
    if (e.constructor && e.constructor.name)
      return String(e.constructor.name);
  }
  return "Error";
}
function Q(n) {
  return n && typeof n == "object" && "message" in n ? String(n.message) : String(n);
}
function q(n) {
  if (n && typeof n == "object" && "stack" in n && n.stack)
    return String(n.stack);
}
function v(n, e) {
  for (let t of e)
    if (typeof t == "string") {
      if (n.includes(t))
        return true;
    } else if (t.test(n))
      return true;
  return false;
}
function c() {
  return typeof globalThis < "u" ? globalThis : {};
}
function p() {
  let n = c();
  return n.window && typeof n.window.addEventListener == "function" ? n.window : null;
}
function M() {
  let n = c();
  return n.document && typeof n.document.addEventListener == "function" ? n.document : null;
}
function D() {
  let n = c();
  return n.navigator && n.navigator.userAgent ? String(n.navigator.userAgent) : "";
}
function x() {
  let n = c();
  return n.location && n.location.href ? String(n.location.href) : undefined;
}
function C() {
  let n = c();
  return typeof n.fetch == "function" ? n.fetch.bind(n) : null;
}
function S() {
  try {
    return new Date().toISOString();
  } catch {
    return "";
  }
}
function I() {
  let n = c();
  try {
    if (n.crypto && typeof n.crypto.randomUUID == "function")
      return n.crypto.randomUUID();
  } catch {}
  return "xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx".replace(/[xy]/g, (e) => {
    let t = Math.floor(Math.random() * 16);
    return (e === "x" ? t : t & 3 | 8).toString(16);
  });
}
function F(n) {
  if (!n || !n.tagName)
    return "";
  let e = String(n.tagName).toLowerCase();
  n.id && (e += `#${n.id}`);
  let t = typeof n.className == "string" ? n.className.trim() : "";
  return t && (e += `.${t.split(/\s+/).slice(0, 3).join(".")}`), e;
}
var A = new Map;
var E = class {
  constructor(e) {
    this.user = null;
    this.tags = {};
    this.extras = {};
    this.contexts = {};
    this.level = null;
    this.fingerprint = null;
    this.breadcrumbs = [];
    this.lastSeen = new Map;
    this.detach = [];
    this.inConsole = false;
    this.groups = new Map;
    this.inFlight = new Set;
    this.rawConsole = {};
    this.config = U(e), this.session = { id: I(), startedAt: S() }, this.nativeFetch = C(), e.initialTags && (this.tags = { ...e.initialTags }), !this.config.key && !this.config.transport && (this.config.debug && console.warn("[bughq] missing key — capture disabled"), this.config.enabled = false), this.config.enabled && (this.config.captureUnhandled && this.installGlobalHandlers(), this.installAutoInstrumentation(), this.sendHeartbeat(), this.installOfflineReplay());
  }
  get queueKey() {
    return `bughq.queue.${this.config.key}`;
  }
  readQueue() {
    try {
      let e = c().localStorage?.getItem?.(this.queueKey), t = e ? JSON.parse(e) : [];
      return Array.isArray(t) ? t.filter((r) => r && typeof r.body == "string" && typeof r.at == "number") : [];
    } catch {
      return [];
    }
  }
  writeQueue(e) {
    try {
      let t = c().localStorage;
      if (!t?.setItem)
        return;
      e.length ? t.setItem(this.queueKey, JSON.stringify(e)) : t.removeItem?.(this.queueKey);
    } catch {}
  }
  canQueue() {
    if (!this.config.offline.enabled || !this.config.key)
      return false;
    try {
      return typeof c().localStorage?.setItem == "function";
    } catch {
      return false;
    }
  }
  enqueue(e) {
    if (!this.canQueue())
      return false;
    let t = Date.now(), r = this.readQueue().filter((s) => t - s.at < this.config.offline.maxAgeMs);
    return r.push({ body: e, at: t }), this.writeQueue(r.slice(-this.config.offline.maxEvents)), true;
  }
  replayQueued() {
    if (!this.canQueue())
      return;
    let e = Date.now(), t = this.readQueue().filter((r) => e - r.at < this.config.offline.maxAgeMs);
    if (!t.length) {
      this.writeQueue([]);
      return;
    }
    this.writeQueue([]);
    for (let r of t)
      this.transport(r.body, 0, "replay");
  }
  installOfflineReplay() {
    if (!this.config.offline.enabled)
      return;
    let e = p();
    if (e) {
      let t = () => this.replayQueued();
      e.addEventListener("online", t), this.detach.push(() => e.removeEventListener("online", t));
    }
    c().navigator?.onLine !== false && this.replayQueued();
  }
  isOffline() {
    return c().navigator?.onLine === false;
  }
  sendHeartbeat() {
    if (this.config.heartbeat === false || !this.config.key)
      return;
    let e = c();
    if (e?.fetch)
      try {
        let t = `bughq.hb.${this.config.key}`, s = Number(e.localStorage?.getItem?.(t) ?? 0) || A.get(t) || 0;
        if (s && Date.now() - s < 86400000)
          return;
        A.set(t, Date.now());
        try {
          e.localStorage?.setItem?.(t, String(Date.now()));
        } catch {}
        e.fetch(`${this.config.host}/sdk/hello`, { method: "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify({ key: this.config.key, sdk: { name: this.config.sdkName, version: k }, environment: this.config.environment, release: this.config.release }), keepalive: true }).catch(() => {});
      } catch {}
  }
  setUser(e) {
    this.user = e;
  }
  setTag(e, t) {
    this.tags[e] = String(t);
  }
  setTags(e) {
    for (let [t, r] of Object.entries(e))
      this.tags[t] = String(r);
  }
  setContext(e, t) {
    t === null ? delete this.contexts[e] : this.contexts[e] = t;
  }
  setExtra(e, t) {
    this.extras[e] = t;
  }
  setExtras(e) {
    this.extras = { ...this.extras, ...e };
  }
  setLevel(e) {
    this.level = e;
  }
  reportFailure(e, t, r) {
    let s = String(e).toLowerCase().replace(/[^a-z0-9._-]+/g, "-").slice(0, 64) || "unknown", i = t instanceof Error ? t : undefined, o = this.outcomeOf(t), u = i ? `${i.name}: ${y(String(i.message)).slice(0, 200)}` : y(String(t ?? "")).slice(0, 200);
    this.dispatch({ type: "OperationFailed", message: `${s} failed (${o})${u ? `: ${u}` : ""}`, stack: i?.stack, level: "error" }, r ? { context: r } : undefined, ["bughq.op", s, o]);
  }
  outcomeOf(e) {
    let t = e, r = Number(t?.status ?? t?.statusCode ?? t?.response?.status ?? 0);
    if (r >= 500)
      return "server";
    if (r === 401 || r === 403)
      return "auth";
    if (r === 422 || r === 400)
      return "validation";
    if (r === 429)
      return "throttle";
    if (r >= 400)
      return "client";
    let s = String(t?.message ?? "").toLowerCase();
    return s.includes("timeout") || s.includes("timed out") ? "timeout" : s.includes("network") || s.includes("failed to fetch") ? "network" : "exception";
  }
  setFingerprint(e) {
    this.fingerprint = e;
  }
  setRelease(e) {
    this.config.release = e;
  }
  setEnvironment(e) {
    this.config.environment = e;
  }
  addBreadcrumb(e) {
    let t = { timestamp: S(), type: "default", ...e };
    if (this.config.beforeBreadcrumb) {
      let s = this.config.beforeBreadcrumb(t);
      if (s === null)
        return;
      s && (t = s);
    }
    this.breadcrumbs.push(t);
    let r = this.breadcrumbs.length - this.config.maxBreadcrumbs;
    r > 0 && this.breadcrumbs.splice(0, r);
  }
  clearBreadcrumbs() {
    this.breadcrumbs = [];
  }
  captureMessage(e, t = "info", r) {
    this.dispatch({ type: "Message", message: e, level: t }, r);
  }
  captureException(e, t) {
    this.dispatch({ type: H(e), message: Q(e), stack: q(e), level: "error" }, t);
  }
  report(e, t) {
    typeof e == "string" ? this.captureMessage(e, "error", t) : this.captureException(e, t);
  }
  dispatch(e, t, r) {
    if (!this.config.enabled || this.config.sampleRate < 1 && Math.random() > this.config.sampleRate)
      return;
    let s = `${e.type}: ${e.message}`;
    if (this.config.ignoreErrors.length && (v(s, this.config.ignoreErrors) || v(e.message, this.config.ignoreErrors)))
      return;
    let i = x(), o = `${i || ""}
${e.stack || ""}`;
    if (this.config.denyUrls.length && v(o, this.config.denyUrls) || this.config.allowUrls.length && !v(o, this.config.allowUrls))
      return;
    let u = `${e.type}|${e.message}|${(e.stack || "").split(`
`)[1] || ""}`, a = Date.now(), d = this.lastSeen.get(u);
    if (d && a - d < this.config.dedupeMs)
      return;
    this.lastSeen.set(u, a);
    let { browser: g, os: f } = j(D()), h = { ...this.extras, ...t || {} }, R = this.buildContexts(), b = { project: this.config.project || undefined, type: e.type, message: e.message, stack: e.stack, level: this.level ?? e.level, url: i, browser: g, os: f, framework: this.config.framework, release: this.config.release, environment: this.config.environment, timestamp: S(), user: this.user, extra: Object.keys(h).length ? h : null, tags: Object.keys(this.tags).length ? { ...this.tags } : undefined, contexts: Object.keys(R).length ? R : undefined, breadcrumbs: this.breadcrumbs.length ? this.breadcrumbs.slice() : undefined, sdk: { name: this.config.sdkName, version: k }, session: this.session, fingerprint: r ?? this.fingerprint ?? undefined };
    if (this.config.beforeSend) {
      let w = this.config.beforeSend(b);
      if (w === null)
        return;
      w && (b = w);
    }
    this.addBreadcrumb({ type: "error", category: "exception", level: b.level, message: `${e.type}: ${e.message}` }), this.send(b);
  }
  buildContexts() {
    let e = {};
    if (this.config.sendDefaultContext) {
      let t = this.deviceContext();
      Object.keys(t).length && (e.device = t);
      let r = this.pageContext();
      Object.keys(r).length && (e.page = r);
    }
    e.runtime = this.runtimeContext();
    for (let [t, r] of Object.entries(this.contexts))
      e[t] = r;
    return e;
  }
  deviceContext() {
    let e = c(), t = {}, r = e.navigator;
    r && (r.language && (t.language = r.language), typeof r.onLine == "boolean" && (t.online = r.onLine), r.hardwareConcurrency && (t.cpuCores = r.hardwareConcurrency), r.deviceMemory && (t.memoryGb = r.deviceMemory));
    let s = e.screen;
    s && s.width && (t.screen = `${s.width}x${s.height}`), e.devicePixelRatio && (t.pixelRatio = e.devicePixelRatio), e.innerWidth && (t.viewport = `${e.innerWidth}x${e.innerHeight}`);
    try {
      t.timezone = Intl.DateTimeFormat().resolvedOptions().timeZone;
    } catch {}
    return t;
  }
  pageContext() {
    let e = c(), t = {};
    e.location && e.location.href && (t.url = e.location.href, e.location.pathname && (t.route = e.location.pathname));
    let r = e.document;
    return r && (r.title && (t.title = r.title), r.referrer && (t.referrer = r.referrer)), t;
  }
  runtimeContext() {
    let e = { sdk: this.config.sdkName, sdkVersion: k };
    return this.config.framework && (e.framework = this.config.framework), e.name = p() ? "browser" : "node", e;
  }
  send(e) {
    if (this.config.transport) {
      let t = () => this.sendHttp(e);
      try {
        let r = this.config.transport(e);
        if (r && typeof r.then == "function") {
          let s = r.then((i) => {
            i === false && t();
          }, t);
          this.inFlight.add(s), s.finally(() => this.inFlight.delete(s));
          return;
        }
        if (r !== false)
          return;
      } catch {}
    }
    this.sendHttp(e);
  }
  sendHttp(e) {
    let t = { ...e, key: this.config.key }, r;
    try {
      r = JSON.stringify(t);
    } catch {
      r = JSON.stringify({ ...t, extra: null, contexts: undefined, breadcrumbs: undefined });
    }
    this.isOffline() && this.enqueue(r) || this.transport(r, 0, e.type);
  }
  transport(e, t, r) {
    let s = `${this.config.host}/errors`, i = { "Content-Type": "application/json" };
    this.config.userAgent && (i["User-Agent"] = this.config.userAgent);
    let o = this.nativeFetch || C();
    if (!o) {
      let u = p();
      if (u && u.navigator && typeof u.navigator.sendBeacon == "function")
        try {
          u.navigator.sendBeacon(s, e);
        } catch {}
      else
        this.config.debug && (this.rawConsole.warn ?? console.warn)("[bughq] no transport available — event dropped");
      return;
    }
    try {
      let u = o(s, { method: "POST", keepalive: true, headers: i, body: e }).then((a) => {
        a && typeof a.status == "number" && a.status >= 500 ? this.retry(e, t, r) : this.config.debug && (this.rawConsole.info ?? console.info)("[bughq] sent", r, a && a.status);
      }, () => this.retry(e, t, r, true));
      this.inFlight.add(u), u.finally(() => this.inFlight.delete(u));
    } catch {
      this.retry(e, t, r, true);
    }
  }
  retry(e, t, r, s = false) {
    if (t >= this.config.maxRetries || s && this.isOffline()) {
      s && this.enqueue(e);
      return;
    }
    let i = c();
    if (typeof i.setTimeout != "function") {
      this.transport(e, t + 1, r);
      return;
    }
    let o = 500 * 2 ** t;
    i.setTimeout(() => this.transport(e, t + 1, r), o);
  }
  async flush(e = 2000) {
    if (this.inFlight.size === 0)
      return true;
    let t = Promise.allSettled([...this.inFlight]).then(() => true), r = new Promise((s) => setTimeout(() => s(false), e));
    return Promise.race([t, r]);
  }
  installGlobalHandlers() {
    let e = p();
    if (!e)
      return;
    let t = (s) => this.captureException(s && s.error ? s.error : (s && s.message, s)), r = (s) => this.captureException(s && "reason" in s ? s.reason : s);
    e.addEventListener("error", t), e.addEventListener("unhandledrejection", r), this.detach.push(() => {
      e.removeEventListener("error", t), e.removeEventListener("unhandledrejection", r);
    });
  }
  installAutoInstrumentation() {
    let e = this.config.autoInstrument;
    e.console && this.instrumentConsole();
    let t = p();
    t && (e.fetch && this.instrumentFetch(t), e.xhr && this.instrumentXhr(), e.dom && this.instrumentDomClicks(), e.navigation && this.instrumentNavigation(t));
  }
  instrumentConsole() {
    let t = c().console;
    if (!t)
      return;
    this.rawConsole = { warn: t.warn?.bind(t), info: t.info?.bind(t), error: t.error?.bind(t) };
    let r = [["log", "info"], ["info", "info"], ["warn", "warning"], ["error", "error"]];
    for (let [s, i] of r) {
      let o = t[s];
      typeof o == "function" && (t[s] = (...u) => {
        if (this.inConsole)
          return o.apply(t, u);
        this.inConsole = true;
        try {
          let a = N(u);
          this.addBreadcrumb({ type: "console", category: `console.${s}`, level: i, message: a }), s === "error" && this.config.captureConsole && this.captureConsoleError(u, a);
        } catch {} finally {
          this.inConsole = false;
        }
        return o.apply(t, u);
      }, this.detach.push(() => {
        t[s] = o;
      }));
    }
  }
  captureConsoleError(e, t) {
    let r = e[0];
    if (this.config.requireLabel && typeof r != "string")
      return;
    let s = new Error("bughq.console").stack ?? "";
    if (!this.config.vendors && !this.isSameOriginStack(s))
      return;
    let i = e.find((g) => g instanceof Error), u = ["bughq.console", "error", T(typeof r == "string" ? y(r) : "console.error") || "-", i?.name || "-", this.routeOf(i) || "-", this.statusOf(i) || "-"], a = u.join("|"), d = this.backoff(a);
    d < 0 || this.dispatch({ type: "ConsoleError", message: t, stack: s, level: "error" }, d > 0 ? { console: { suppressed: d } } : undefined, u);
  }
  isSameOriginStack(e) {
    let t = c()?.location?.origin;
    if (!t)
      return true;
    for (let r of e.split(`
`).slice(1)) {
      let s = r.match(/https?:\/\/[^\s):]+/);
      if (s && !(s[0].includes("/bughq") || s[0].includes("@bughq")))
        return s[0].startsWith(t);
    }
    return true;
  }
  routeOf(e) {
    let t = e, r = t?.request ?? t?.url ?? t?.config?.url ?? String(t?.message ?? "").match(/https?:\/\/[^\s'"`]+/)?.[0];
    if (!r)
      return "";
    let s = String(t?.method ?? t?.config?.method ?? "").toUpperCase();
    return `${s ? `${s} ` : ""}${m(String(r))}`;
  }
  statusOf(e) {
    let t = e, r = t?.status ?? t?.statusCode ?? t?.response?.status ?? String(t?.message ?? "").match(/\b([1-5]\d{2})\b/)?.[1];
    return r ? String(r) : "";
  }
  backoff(e) {
    let t = Date.now(), r = this.groups.get(e);
    if (!r)
      return this.groups.set(e, { last: t, n: 1, suppressed: 0 }), 0;
    let s = Math.min(1e4 * 2 ** (r.n - 1), 1800000);
    if (t - r.last < s)
      return r.suppressed++, -1;
    let i = r.suppressed;
    return r.last = t, r.n++, r.suppressed = 0, i;
  }
  instrumentFetch(e) {
    let t = e.fetch;
    if (typeof t != "function")
      return;
    let r = this.config.host, s = this;
    e.fetch = function(...i) {
      let o = i[0], u = i[1] && i[1].method || o && o.method || "GET", a = typeof o == "string" ? o : o && o.url || String(o), d = Date.now(), g = t.apply(this, i);
      return typeof a == "string" && a.indexOf(r) === 0 || g && typeof g.then == "function" && g.then((f) => s.addBreadcrumb({ type: "http", category: "fetch", level: f && f.status >= 400 ? "warning" : "info", data: { method: String(u).toUpperCase(), url: m(a), status: f && f.status, durationMs: Date.now() - d } }), () => s.addBreadcrumb({ type: "http", category: "fetch", level: "error", data: { method: String(u).toUpperCase(), url: m(a), error: true, durationMs: Date.now() - d } })), g;
    }, this.detach.push(() => {
      e.fetch = t;
    });
  }
  instrumentXhr() {
    let t = c().XMLHttpRequest;
    if (typeof t != "function" || !t.prototype)
      return;
    let r = t.prototype, { open: s, send: i } = r, o = this, u = this.config.host;
    r.open = function(a, d) {
      return this.__bughq = { method: a, url: d, started: 0 }, s.apply(this, arguments);
    }, r.send = function() {
      let a = this.__bughq;
      return a && (a.started = Date.now(), this.addEventListener("loadend", () => {
        try {
          if (typeof a.url == "string" && a.url.indexOf(u) === 0)
            return;
          o.addBreadcrumb({ type: "http", category: "xhr", level: this.status >= 400 ? "warning" : "info", data: { method: String(a.method).toUpperCase(), url: m(a.url), status: this.status, durationMs: Date.now() - a.started } });
        } catch {}
      })), i.apply(this, arguments);
    }, this.detach.push(() => {
      r.open = s, r.send = i;
    });
  }
  instrumentDomClicks() {
    let e = M();
    if (!e)
      return;
    let t = (r) => {
      try {
        let s = r && r.target, i = F(s);
        if (!i)
          return;
        let o = s && typeof s.textContent == "string" ? s.textContent.trim().slice(0, 60) : "";
        this.addBreadcrumb({ type: "ui", category: "ui.click", message: i, data: o ? { text: o } : undefined });
      } catch {}
    };
    e.addEventListener("click", t, true), this.detach.push(() => e.removeEventListener("click", t, true));
  }
  instrumentNavigation(e) {
    let r = c().history, s = (a, d) => this.addBreadcrumb({ type: "navigation", category: "navigation", message: d, data: { to: a || x() } }), i = () => {};
    if (r && typeof r.pushState == "function") {
      let { pushState: a, replaceState: d } = r;
      r.pushState = function(g, f, h) {
        return s(h != null ? String(h) : undefined, "pushState"), a.apply(this, arguments);
      }, r.replaceState = function(g, f, h) {
        return s(h != null ? String(h) : undefined, "replaceState"), d.apply(this, arguments);
      }, i = () => {
        r.pushState = a, r.replaceState = d;
      };
    }
    let o = () => s(x(), "popstate"), u = () => s(x(), "hashchange");
    e.addEventListener("popstate", o), e.addEventListener("hashchange", u), this.detach.push(() => {
      i(), e.removeEventListener("popstate", o), e.removeEventListener("hashchange", u);
    });
  }
  close() {
    this.detach.forEach((e) => {
      try {
        e();
      } catch {}
    }), this.detach = [];
  }
};
function m(n) {
  try {
    let e = new URL(n, typeof c()?.location?.href == "string" ? c().location.href : "http://x"), t = e.pathname.split("/").map((s) => s && (/^\d+$/.test(s) ? "{n}" : /^[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}$/i.test(s) ? "{uuid}" : s.length >= 4 && /[a-z]/i.test(s) && /\d/.test(s) ? "{id}" : s)).join("/");
    return (typeof c()?.location?.origin == "string" && e.origin === c().location.origin ? "" : e.origin) + t + (e.search ? "?…" : "");
  } catch {
    return String(n).split("?")[0].slice(0, 200);
  }
}
function y(n) {
  let e = String(n);
  return e = e.replace(/\b(?:eyJ[\w-]{10,}\.){2}[\w-]{10,}\b/g, "[jwt]"), e = e.replace(/\b(?:sk|pk|rk)_(?:live|test)_[A-Za-z0-9]{8,}\b/g, "[key]"), e = e.replace(/\bBearer\s+[\w.\-+/=]{8,}/gi, "Bearer [token]"), e = e.replace(/([?&](?:token|key|secret|password|signature|sig|auth|access_token|api_key)=)[^&\s]*/gi, "$1[redacted]"), e = e.replace(/\b[\w.%+-]+@[\w.-]+\.[A-Za-z]{2,}\b/g, "[email]"), e = e.replace(/\b(?:\d[ -]*?){13,19}\b/g, (t) => _(t.replace(/\D/g, "")) ? "[card]" : t), e = e.replace(/\b\d{3}-\d{2}-\d{4}\b/g, "[ssn]"), e = e.replace(/\b[A-Za-z0-9_-]{32,}\b/g, "[token]"), e;
}
function _(n) {
  if (n.length < 13 || n.length > 19)
    return false;
  let e = 0, t = false;
  for (let r = n.length - 1;r >= 0; r--) {
    let s = n.charCodeAt(r) - 48;
    if (s < 0 || s > 9)
      return false;
    t && (s *= 2, s > 9 && (s -= 9)), e += s, t = !t;
  }
  return e % 10 === 0;
}
function N(n) {
  return n.map((e) => typeof e == "string" ? y(e).slice(0, 200) : e === null ? "null" : e === undefined ? "undefined" : typeof e == "number" || typeof e == "boolean" ? String(e) : typeof e == "function" ? "[Function]" : typeof e == "symbol" ? "[Symbol]" : e instanceof Error ? `${e.name}: ${y(String(e.message)).slice(0, 200)}` : Array.isArray(e) ? `[Array(${e.length})]` : "[Object]").join(" ").slice(0, 300);
}
function T(n) {
  let e = String(n);
  return e = e.replace(/https?:\/\/[^\s'"`)]+/g, (t) => m(t)), e = e.replace(/(['"`]).*?\1/g, "$1…$1"), e = e.replace(/\b[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}\b/gi, "{uuid}"), e = e.replace(/\b[\w.%+-]+@[\w.-]+\.[A-Za-z]{2,}\b/g, "{email}"), e = e.replace(/\b[A-Za-z0-9_-]{4,}\b/g, (t) => /[A-Za-z]/.test(t) && /\d/.test(t) ? "{id}" : t), e = e.replace(/\b\d+\b/g, "{n}"), e.replace(/\s+/g, " ").trim().slice(0, 80);
}

// node_modules/@stacksjs/mobile/dist/index.js
var Dr = 2500;
function E2() {
  if (typeof window > "u")
    return;
  return window;
}
function Q2() {
  let e = E2()?.craft;
  return e && typeof e === "object" ? e : undefined;
}
function Gt() {
  return typeof navigator > "u" ? "" : navigator.userAgent || "";
}
function re() {
  let e = E2();
  if (!e)
    return false;
  if (e.CraftAndroid)
    return true;
  let t = Q2()?.platform;
  if (t === "ios" || t === "android")
    return true;
  return Boolean(e.webkit?.messageHandlers?.craft) && /iPhone|iPad|iPod/.test(Gt());
}
function ge() {
  let e = E2();
  if (!e || e.craft)
    return false;
  return re() || Boolean(e.webkit?.messageHandlers?.craft);
}
function ee(e = 15000) {
  let t = E2();
  if (t?.craft)
    return Promise.resolve(true);
  if (!t || !ge())
    return Promise.resolve(false);
  return new Promise((n) => {
    let r = () => {
      clearTimeout(o), t.removeEventListener("craftReady", r), n(Boolean(t.craft));
    }, o = setTimeout(r, e);
    t.addEventListener("craftReady", r);
  });
}
function Yt(e, t) {
  if (!e)
    return null;
  let n = t.split("."), r = e;
  for (let i of n.slice(0, -1))
    if (r = r?.[i], !r || typeof r !== "object" && typeof r !== "function")
      return null;
  let o = r?.[n[n.length - 1]];
  return typeof o === "function" ? o.bind(r) : null;
}
function M2(e) {
  return Yt(Q2(), e);
}
async function Xt(e, t = 2500) {
  let n = M2(e);
  if (n || !ge())
    return n;
  return await ee(t), M2(e);
}
async function w(e, t, n, r = {}) {
  let o = await Xt(e, r.timeoutMs);
  if (!o)
    return n();
  try {
    return await o(...t);
  } catch (i) {
    if (r.fallbackOnError)
      return n();
    throw i;
  }
}
async function d(e, t = 2500) {
  if (ge())
    await ee(t);
  return e();
}
function J(e, t = 2500) {
  let n, r = false;
  if (!ge())
    n = e();
  else
    ee(t).then(() => {
      if (!r)
        n = e();
    });
  return () => {
    if (r = true, typeof n === "function")
      n();
  };
}
function W(e, t) {
  let n = E2();
  if (!n)
    return () => {};
  let r = (o) => t(o.detail ?? {});
  return n.addEventListener(e, r), () => n.removeEventListener(e, r);
}
var qe = "native-dialog-styles";
var Qt = `
.native-dialog { position: fixed; inset: 0; z-index: 2147483000; font-size: var(--native-font-size, 17px); font-family: var(--native-font-family, -apple-system, system-ui, sans-serif); -webkit-tap-highlight-color: transparent; }
.native-dialog-backdrop { position: absolute; inset: 0; background: rgb(0 0 0 / 0.3); opacity: 0; transition: opacity 220ms ease; }
.native-dialog--menu .native-dialog-backdrop { background: rgb(0 0 0 / 0.12); -webkit-backdrop-filter: blur(14px) saturate(140%); backdrop-filter: blur(14px) saturate(140%); }
.native-dialog.is-open .native-dialog-backdrop { opacity: 1; }
.native-dialog-panel { position: absolute; outline: none; }
.native-dialog--sheet .native-dialog-panel { right: 0; bottom: 0; left: 0; display: flex; flex-direction: column; gap: 0.47em; max-width: 32rem; margin: 0 auto; padding: 0 0.47em calc(0.47em + env(safe-area-inset-bottom, 0px)); transform: translateY(110%); transition: transform 380ms cubic-bezier(0.32, 0.72, 0, 1); }
.native-dialog--sheet.is-open .native-dialog-panel { transform: none; }
.native-dialog--alert .native-dialog-panel { top: 50%; left: 50%; width: min(16.5em, calc(100vw - 3rem)); transform: translate(-50%, -50%) scale(1.12); opacity: 0; transition: transform 260ms cubic-bezier(0.2, 0.9, 0.3, 1.05), opacity 200ms ease; }
.native-dialog--alert.is-open .native-dialog-panel { transform: translate(-50%, -50%); opacity: 1; }
.native-dialog-group { overflow: hidden; border-radius: 0.8em; background: var(--native-dialog-background, rgb(242 242 247 / 0.92)); -webkit-backdrop-filter: blur(24px) saturate(180%); backdrop-filter: blur(24px) saturate(180%); }
.native-dialog-header { padding: 0.85em 1em; text-align: center; }
.native-dialog--sheet .native-dialog-header { border-bottom: 0.5px solid var(--native-separator, rgb(60 60 67 / 0.29)); }
.native-dialog-title { margin: 0; font-size: 0.765em; font-weight: 600; color: var(--native-secondary-label, rgb(60 60 67 / 0.6)); }
.native-dialog--alert .native-dialog-title { font-size: 1em; color: inherit; }
.native-dialog-message { margin: 0.25em 0 0; font-size: 0.765em; color: var(--native-secondary-label, rgb(60 60 67 / 0.6)); }
.native-dialog--alert .native-dialog-message { color: inherit; }
.native-dialog-actions { display: flex; flex-direction: column; }
.native-dialog--alert .native-dialog-actions { border-top: 0.5px solid var(--native-separator, rgb(60 60 67 / 0.29)); }
.native-dialog--alert .native-dialog-actions.is-row { flex-direction: row; }
.native-dialog-action { width: 100%; min-height: 3.3em; padding: 0 1em; border: 0; border-top: 0.5px solid var(--native-separator, rgb(60 60 67 / 0.29)); color: var(--native-accent, rgb(0 122 255)); background: transparent; font: inherit; font-size: 1.18em; cursor: pointer; }
.native-dialog--alert .native-dialog-action { min-height: 2.6em; font-size: 1em; }
.native-dialog-action:first-child { border-top: 0; }
.native-dialog-actions.is-row .native-dialog-action { flex: 1; border-top: 0; border-left: 0.5px solid var(--native-separator, rgb(60 60 67 / 0.29)); }
.native-dialog-actions.is-row .native-dialog-action:first-child { border-left: 0; }
.native-dialog-action.is-cancel { font-weight: 600; }
.native-dialog-action.is-destructive { color: var(--native-destructive, rgb(255 59 48)); }
.native-dialog-action:active, .native-dialog-action:focus-visible { background: var(--native-pressed, rgb(0 0 0 / 0.08)); outline: none; }
.native-menu { position: absolute; width: min(15.5em, calc(100vw - 1.5rem)); overflow: hidden; border-radius: 0.8em; background: var(--native-dialog-background, rgb(242 242 247 / 0.92)); box-shadow: 0 10px 40px rgb(0 0 0 / 0.2); -webkit-backdrop-filter: blur(24px) saturate(180%); backdrop-filter: blur(24px) saturate(180%); transform: scale(0.6); transform-origin: var(--native-menu-origin, top left); opacity: 0; transition: transform 300ms cubic-bezier(0.2, 0.9, 0.3, 1.1), opacity 160ms ease; }
.native-dialog.is-open .native-menu { transform: none; opacity: 1; }
.native-menu-title { margin: 0; padding: 0.6em 1em; border-bottom: 0.5px solid var(--native-separator, rgb(60 60 67 / 0.29)); font-size: 0.765em; color: var(--native-secondary-label, rgb(60 60 67 / 0.6)); }
.native-menu-item { display: flex; gap: 0.75em; align-items: center; justify-content: space-between; width: 100%; min-height: 2.6em; padding: 0 1em; border: 0; border-top: 0.5px solid var(--native-separator, rgb(60 60 67 / 0.29)); color: inherit; background: transparent; font: inherit; text-align: left; cursor: pointer; }
.native-menu-item:first-of-type { border-top: 0; }
.native-menu-item.is-destructive { color: var(--native-destructive, rgb(255 59 48)); }
.native-menu-item:disabled { opacity: 0.35; }
.native-menu-item:active, .native-menu-item:focus-visible { background: var(--native-pressed, rgb(0 0 0 / 0.08)); outline: none; }
.native-menu-icon { flex-shrink: 0; width: 1.1em; height: 1.1em; }
.dark .native-dialog-group, .dark .native-menu { background: var(--native-dialog-background-dark, rgb(44 44 46 / 0.9)); color: rgb(255 255 255); }
.dark .native-dialog-action { color: var(--native-accent-dark, rgb(10 132 255)); }
.dark .native-dialog-action.is-destructive, .dark .native-menu-item.is-destructive { color: var(--native-destructive-dark, rgb(255 69 58)); }
.dark .native-dialog-title, .dark .native-dialog-message, .dark .native-menu-title { color: rgb(235 235 245 / 0.6); }
.dark .native-dialog--alert .native-dialog-title, .dark .native-dialog--alert .native-dialog-message { color: rgb(255 255 255); }
.dark .native-dialog-action, .dark .native-menu-item, .dark .native-dialog-header, .dark .native-menu-title, .dark .native-dialog-actions { border-color: rgb(84 84 88 / 0.6); }
.dark .native-dialog-action:active, .dark .native-menu-item:active { background: rgb(255 255 255 / 0.1); }
@media (prefers-reduced-motion: reduce) {
  .native-dialog-backdrop, .native-dialog-panel, .native-menu { transition: opacity 150ms ease; }
  .native-dialog--sheet .native-dialog-panel, .native-dialog--alert .native-dialog-panel, .native-menu { transform: none; }
  .native-dialog--alert .native-dialog-panel { transform: translate(-50%, -50%); }
}
:root[data-native-reduce-motion] .native-dialog--sheet .native-dialog-panel, :root[data-native-reduce-motion] .native-menu { transform: none; transition: opacity 150ms ease; }
@media (prefers-reduced-transparency: reduce) {
  .native-dialog-group, .native-menu { -webkit-backdrop-filter: none; backdrop-filter: none; background: var(--native-dialog-solid, rgb(242 242 247)); }
  .dark .native-dialog-group, .dark .native-menu { background: var(--native-dialog-solid-dark, rgb(44 44 46)); }
}
`;
function Ge() {
  return E2()?.document;
}
function Jt(e) {
  if (e.getElementById(qe))
    return;
  let t = e.createElement("style");
  t.id = qe, t.textContent = Qt, (e.head ?? e.documentElement).appendChild(t);
}
var Zt = 0;
function N2(e, t, n, r) {
  let o = e.createElement(t);
  if (o.className = n, r !== undefined)
    o.textContent = r;
  return o;
}
function Ve() {
  return E2()?.stx?.overlays;
}
var en = 0;
function Ye(e, t, n, r) {
  Jt(e);
  let o = E2(), i = `native-dialog-layer-${++en}`, a = N2(e, "div", `native-dialog native-dialog--${t}`);
  return a.setAttribute("data-native-dialog", t), a.appendChild(N2(e, "div", "native-dialog-backdrop")), new Promise((s) => {
    let l = false, f = (c) => {
      if (l)
        return;
      l = true, a.classList.remove("is-open"), Ve()?.close(i), setTimeout(() => a.remove(), 260), s(c);
    }, u = n({ root: a, settle: f });
    a.appendChild(u), e.body.appendChild(a), Ve()?.open(i, { panel: u, root: a, onEscape: () => f(r()) });
    let m = o;
    (typeof m?.requestAnimationFrame === "function" ? (c) => m.requestAnimationFrame(() => m.requestAnimationFrame(c)) : (c) => setTimeout(c, 16))(() => {
      if (!l)
        a.classList.add("is-open");
    });
  });
}
function Ie(e) {
  let t = Ge();
  if (!t?.body)
    return Promise.resolve(null);
  let n = `native-dialog-${++Zt}`, r = e.actions.find((a) => a.style === "cancel"), o = e.variant === "sheet" ? e.actions.filter((a) => a.style !== "cancel") : e.actions, i = e.variant === "sheet" ? r ?? { id: "__cancel", title: e.cancelLabel || "Cancel", style: "cancel" } : undefined;
  return Ye(t, e.variant, ({ root: a, settle: s }) => {
    let l = (c) => c.style === "cancel" ? null : c.id, f = N2(t, "div", "native-dialog-panel");
    f.setAttribute("role", "alertdialog"), f.setAttribute("aria-modal", "true"), f.tabIndex = -1;
    let u = N2(t, "div", "native-dialog-group");
    if (e.title || e.message) {
      let c = N2(t, "div", "native-dialog-header");
      if (e.title) {
        let p = N2(t, "p", "native-dialog-title", e.title);
        p.id = `${n}-title`, c.appendChild(p), f.setAttribute("aria-labelledby", p.id);
      }
      if (e.message) {
        let p = N2(t, "p", "native-dialog-message", e.message);
        p.id = `${n}-message`, c.appendChild(p), f.setAttribute("aria-describedby", p.id);
      }
      u.appendChild(c);
    }
    let m = N2(t, "div", "native-dialog-actions");
    if (e.variant === "alert" && o.length === 2)
      m.classList.add("is-row");
    for (let c of o) {
      let p = N2(t, "button", `native-dialog-action${c.style === "destructive" ? " is-destructive" : ""}${c.style === "cancel" ? " is-cancel" : ""}`, c.title);
      p.type = "button", p.setAttribute("data-action-id", c.id), p.addEventListener("click", () => s(l(c))), m.appendChild(p);
    }
    if (u.appendChild(m), f.appendChild(u), i) {
      let c = N2(t, "div", "native-dialog-group"), p = N2(t, "button", "native-dialog-action is-cancel", i.title);
      p.type = "button", p.setAttribute("data-action-id", i.id), p.addEventListener("click", () => s(null)), c.appendChild(p), f.appendChild(c);
    }
    let b = a.querySelector(".native-dialog-backdrop");
    if (e.variant === "sheet")
      b?.addEventListener("click", () => s(null));
    return f;
  }, () => {
    if (e.variant === "sheet")
      return null;
    if (r)
      return null;
    return o.length === 1 ? o[0].id : null;
  });
}
async function Xe(e) {
  await Ie({ variant: "alert", title: e.title, message: e.message, actions: [{ id: "ok", title: e.okLabel || "OK" }] });
}
async function Qe(e) {
  return await Ie({ variant: "alert", title: e.title, message: e.message, actions: [{ id: "cancel", title: e.cancelLabel || "Cancel", style: "cancel" }, { id: "confirm", title: e.confirmLabel || "OK", style: e.destructive ? "destructive" : "default" }] }) === "confirm";
}
function Je(e) {
  return Ie({ variant: "sheet", title: e.title, message: e.message, actions: e.actions, cancelLabel: e.cancelLabel });
}
function tn(e, t, n) {
  let i = Math.max(12, Math.min(e.x, n.width - t.width - 12)), a = e.y + e.height + 8, s = a + t.height <= n.height - 12, l = e.y - 8 - t.height, f = s || l < 12 ? Math.max(12, Math.min(a, n.height - t.height - 12)) : l, u = e.x + e.width / 2 > n.width / 2 ? "right" : "left";
  return { top: f, left: i, origin: `${s || l < 12 ? "top" : "bottom"} ${u}` };
}
function Ze(e) {
  let t = Ge();
  if (!t?.body)
    return Promise.resolve(null);
  let n = E2();
  return Ye(t, "menu", ({ root: r, settle: o }) => {
    let i = N2(t, "div", "native-menu native-dialog-panel");
    if (i.setAttribute("role", "menu"), e.title)
      i.appendChild(N2(t, "p", "native-menu-title", e.title)), i.setAttribute("aria-label", e.title);
    for (let a of e.items) {
      let s = N2(t, "button", `native-menu-item${a.destructive ? " is-destructive" : ""}`);
      if (s.type = "button", s.setAttribute("role", "menuitem"), s.setAttribute("data-action-id", a.id), a.disabled)
        s.disabled = true;
      if (s.appendChild(N2(t, "span", "native-menu-label", a.title)), a.icon) {
        let l = N2(t, "i", `native-menu-icon ${a.icon}`);
        l.setAttribute("aria-hidden", "true"), s.appendChild(l);
      }
      s.addEventListener("click", () => o(a.id)), i.appendChild(s);
    }
    return r.querySelector(".native-dialog-backdrop")?.addEventListener("click", () => o(null)), queueMicrotask(() => {
      let a = i.getBoundingClientRect?.(), s = tn(e.anchor, { width: a?.width || 248, height: a?.height || e.items.length * 44 }, { width: n?.innerWidth || 390, height: n?.innerHeight || 844 });
      i.style.top = `${s.top}px`, i.style.left = `${s.left}px`, i.style.setProperty("--native-menu-origin", s.origin);
    }), i;
  }, () => null);
}
var rt = () => true;
var _2 = () => false;
var K = () => null;
function et() {
  return E2()?.navigator ?? (typeof navigator > "u" ? undefined : navigator);
}
function Ne(e) {
  return { x: Math.round(e.x ?? e.left ?? 0), y: Math.round(e.y ?? e.top ?? 0), width: Math.round(e.width), height: Math.round(e.height) };
}
var oe = { alert: (e) => w("dialog.alert", [e], () => Xe(e), { fallbackOnError: true }).then(() => {}), confirm: (e) => w("dialog.confirm", [e], () => Qe(e), { fallbackOnError: true }).then(Boolean), actionSheet: async (e) => {
  let t = { ...e, anchor: e.anchor ? Ne(e.anchor) : undefined }, n = await w("dialog.actionSheet", [t], () => Je(e), { fallbackOnError: true });
  if (typeof n !== "string")
    return null;
  return e.actions.find((r) => r.id === n)?.style === "cancel" ? null : n;
} };
function Wr() {
  return (e) => oe.actionSheet(e);
}
async function $r(e) {
  if ((e.style ?? (e.destructive ? "sheet" : "alert")) === "alert")
    return oe.confirm(e);
  return await oe.actionSheet({ title: e.title, message: e.message, anchor: e.anchor, actions: [{ id: "confirm", title: e.confirmLabel || "OK", style: e.destructive ? "destructive" : "default" }, { id: "cancel", title: e.cancelLabel || "Cancel", style: "cancel" }] }) === "confirm";
}
var De = { show: async (e) => {
  let t = { title: e.title, anchor: Ne(e.anchor), items: e.items.map(({ id: r, title: o, symbol: i, destructive: a, disabled: s }) => ({ id: r, title: o, symbol: i, destructive: a, disabled: s })) }, n = await w("contextMenu.show", [t], () => Ze(e), { fallbackOnError: true });
  return typeof n === "string" ? n : null;
} };
function Kr(e, t) {
  return De.show({ ...t, anchor: Ne(e.getBoundingClientRect()) });
}
function nn(e, t) {
  let n = E2();
  if (!n)
    return { cancelled: true };
  if (typeof n.craft?.openURL === "function")
    return Promise.resolve(n.craft.openURL(e)).catch(() => {}), { cancelled: false };
  if (t.mode === "auth")
    return n.location?.assign(e), { cancelled: false };
  if (!(typeof n.open === "function" ? n.open(e, "_blank", "noopener") : null))
    n.location?.assign(e);
  return { cancelled: false };
}
var ot = { open: async (e, t = {}) => {
  let n = await w("browser.open", [e, t], () => nn(e, t), { fallbackOnError: true });
  if (!n || typeof n !== "object")
    return { cancelled: false };
  let { url: r, cancelled: o } = n;
  return typeof r === "string" ? { url: r, cancelled: Boolean(o) } : { cancelled: Boolean(o) };
} };
var Me = new Map;
var Le = new Map;
function tt(e, t) {
  return `${e}|${t.pointSize ?? ""}|${t.weight ?? ""}|${t.color ?? ""}|${t.scale ?? ""}`;
}
var it = { isAvailable: () => M2("symbols.image") !== null, image: (e, t = {}) => {
  let n = tt(e, t), r = Me.get(n);
  if (r)
    return r;
  let o = w("symbols.image", [e, t], K).then((i) => typeof i === "string" && i.startsWith("data:") ? i : null, K).then((i) => (Le.set(n, i), i));
  return Me.set(n, o), o;
}, cached: (e, t = {}) => Le.get(tt(e, t)), clearCache: () => {
  Me.clear(), Le.clear();
} };
var he = { setStyle: (e) => w("statusBar.setStyle", [e], _2, { fallbackOnError: true }).then((t) => t !== false) };
var ie = { setUnderPageColor: (e) => w("chrome.setUnderPageColor", [e], _2, { fallbackOnError: true }).then((t) => t !== false), setKeyboardAccessory: (e) => w("chrome.setKeyboardAccessory", [e], _2, { fallbackOnError: true }).then((t) => t !== false) };
var Y = { isAvailable: () => M2("refresh.enable") !== null, enable: (e) => w("refresh.enable", [e ?? {}], _2, { fallbackOnError: true }).then((t) => t !== false), disable: () => w("refresh.disable", [], _2, { fallbackOnError: true }).then((e) => e !== false), end: () => w("refresh.end", [], _2, { fallbackOnError: true }).then((e) => e !== false), onRefresh: (e) => W("craftRefresh", () => e()) };
var ae = { complete: (e) => w("background.complete", [e], _2, { fallbackOnError: true }).then((t) => t !== false) };
var at = { write: (e) => w("clipboard.write", [e], async () => {
  let t = et()?.clipboard;
  if (!t?.writeText)
    return false;
  return t.writeText(e).then(rt, _2);
}, { fallbackOnError: true }).then((t) => t !== false), read: () => w("clipboard.read", [], async () => {
  let e = et()?.clipboard;
  if (!e?.readText)
    return null;
  return e.readText().catch(K);
}, { fallbackOnError: true }).then((e) => typeof e === "string" ? e : null) };
var st = { isAvailable: () => M2("db.query") !== null, query: (e, t = []) => w("db.query", [e, t], K).then((n) => Array.isArray(n) ? n : null), execute: (e, t = []) => w("db.execute", [e, t], K).then((n) => {
  if (!n || typeof n !== "object")
    return null;
  let { rowsAffected: r, lastInsertId: o } = n;
  return { rowsAffected: Number(r) || 0, lastInsertId: Number(o) || 0 };
}) };
function Ce(e, t) {
  let n = E2()?.document;
  if (!n?.body)
    return null;
  let r = n.createElement("a");
  return r.href = e, r.download = t, r.rel = "noopener", r.style.display = "none", n.body.appendChild(r), r.click(), r.remove(), t;
}
function rn(e) {
  let t = E2()?.document;
  if (!t?.body)
    return Promise.resolve(null);
  return new Promise((n) => {
    let r = t.createElement("input");
    if (r.type = "file", r.style.display = "none", e.length)
      r.accept = e.map((i) => i.includes("/") || i.startsWith(".") ? i : `.${i}`).join(",");
    let o = (i) => {
      r.remove(), n(i);
    };
    r.addEventListener("cancel", () => o(null)), r.addEventListener("change", () => {
      let i = r.files?.[0];
      if (!i)
        return o(null);
      let a = new FileReader;
      a.onload = () => o({ name: i.name, mimeType: i.type || undefined, data: typeof a.result === "string" ? a.result : undefined }), a.onerror = () => o({ name: i.name, mimeType: i.type || undefined }), a.readAsDataURL(i);
    }), t.body.appendChild(r), r.click();
  });
}
var lt = { openPDF: (e, t = 0) => w("openPDF", [e, t], () => {
  let n = E2();
  return Boolean(n?.open?.(e, "_blank", "noopener"));
}).then((n) => n !== false), takeScreenshot: () => w("takeScreenshot", [], K, { fallbackOnError: true }).then((e) => typeof e === "string" ? e : null), scanQRCode: () => w("scanQRCode", [], K).then((e) => {
  if (!e || typeof e !== "object")
    return null;
  let { type: t, data: n } = e;
  return typeof n === "string" ? { type: String(t ?? ""), data: n } : null;
}, K), pickFile: (e = []) => w("pickFile", [e], () => rn(e)).then((t) => {
  if (!t || typeof t !== "object")
    return null;
  let n = t;
  if (typeof n.name !== "string")
    return null;
  return { name: n.name, path: typeof n.path === "string" ? n.path : undefined, data: typeof n.data === "string" ? n.data : undefined, mimeType: typeof n.mimeType === "string" ? n.mimeType : undefined };
}, K), saveFile: (e, t, n) => w("saveFile", [e, t, n], () => {
  if (e.startsWith("data:"))
    return Ce(e, t);
  let r = new Blob([e], { type: n || "text/plain" }), o = URL.createObjectURL(r), i = Ce(o, t);
  return setTimeout(() => URL.revokeObjectURL(o), 1000), i;
}).then((r) => typeof r === "string" ? r : null), downloadFile: (e, t) => w("downloadFile", [e, t], () => Ce(e, t)).then((n) => typeof n === "string" ? n : null) };
var ct = { set: (e) => w("shortcuts.set", [e.map(({ symbol: t, ...n }) => t ? { ...n, iconName: t } : n)], _2).then((t) => t !== false), clear: () => w("shortcuts.clear", [], _2).then((e) => e !== false), onShortcut: (e) => W("craftShortcut", (t) => {
  if (typeof t.type === "string")
    e(t.type);
}) };
var ut = { update: (e) => w("widget.update", [e], _2).then((t) => t !== false), reload: () => w("widget.reload", [], _2).then((e) => e !== false) };
var on = { portrait: "portrait-primary", portraitUpsideDown: "portrait-secondary", landscape: "landscape", landscapeLeft: "landscape-primary", landscapeRight: "landscape-secondary" };
function nt() {
  return E2()?.screen?.orientation;
}
var dt = { lock: (e) => w("lockOrientation", [e], () => {
  let t = nt();
  return t?.lock ? t.lock(on[e]).then(rt, _2) : false;
}).then((t) => t !== false), unlock: () => w("unlockOrientation", [], () => (nt()?.unlock?.(), true)).then((e) => e !== false) };
var pt = { signInWithApple: (e = {}) => w("signInWithApple", e.nonce ? [{ nonce: e.nonce }] : [], K).then((t) => {
  if (!t || typeof t !== "object" || typeof t.userId !== "string")
    return null;
  return t;
}) };
var ft = { isAvailable: () => M2("iap.purchase") !== null, products: (e) => w("iap.getProducts", [e], () => []).then((t) => Array.isArray(t) ? t : []), purchase: (e) => w("iap.purchase", [e], K).then((t) => t && typeof t === "object" ? t : null, (t) => {
  if (/cancel/i.test(String(t?.message ?? t)))
    return null;
  throw t;
}), restore: () => w("iap.restore", [], () => []).then((e) => Array.isArray(e) ? e : []) };
function mt() {
  return Q2()?.capabilities?.storageCompareAndSet === true && storage.supportsCompareAndSet?.() === true;
}
function gt() {
  return Q2()?.capabilities?.storageSetIfAbsent === true && storage.supportsSetIfAbsent?.() === true;
}
var ht = { supportsCompareAndSet: mt, supportsSetIfAbsent: gt, get: (e) => d(() => storage.get(e)), set: (e, t) => d(() => storage.set(e, t)), remove: (e) => d(() => storage.remove(e)), clear: () => d(() => storage.clear()), keys: () => d(() => storage.keys()), setIfAbsent: (e, t) => d(() => {
  if (!gt())
    throw Object.assign(Error("This host or adapter cannot create storage atomically"), { code: "STORAGE_SET_IF_ABSENT_UNSUPPORTED" });
  return storage.setIfAbsent(e, t);
}), compareAndSet: (e, t, n) => d(() => {
  if (!mt())
    throw Object.assign(Error("This host or adapter cannot compare storage atomically"), { code: "STORAGE_COMPARE_AND_SET_UNSUPPORTED" });
  return storage.compareAndSet(e, t, n);
}) };
var bt = { randomUUID: () => d(() => crypto.randomUUID()) };
var sn = ["authorized", "denied", "notDetermined", "restricted", "unsupported"];
function be() {
  let e = Q2(), t = e?.scheduledWorkouts;
  if (!t || typeof t !== "object" || e?.capabilities?.scheduledWorkouts !== true)
    return;
  return t;
}
function ln() {
  return Object.assign(Error("unsupported"), { code: "UNSUPPORTED" });
}
function vt(e) {
  return sn.includes(e) ? e : "unsupported";
}
function cn(e) {
  if (!e || typeof e !== "object")
    return null;
  let t = e;
  if (typeof t.id !== "string" || !t.id || typeof t.date !== "string" || !/^\d{4}-\d{2}-\d{2}$/.test(t.date))
    return null;
  let n = { id: t.id.toLowerCase(), date: t.date, complete: t.complete === true };
  if (typeof t.hour === "number" && Number.isFinite(t.hour))
    n.hour = t.hour;
  if (typeof t.minute === "number" && Number.isFinite(t.minute))
    n.minute = t.minute;
  return n;
}
function te(e, t, ...n) {
  return d(async () => {
    let r = be();
    if (typeof r?.[e] !== "function")
      throw ln();
    return t(await r[e](...n));
  });
}
var yt = { isAvailable: () => typeof be()?.isSupported === "function", supports: (e) => typeof be()?.[e] === "function", isSupported: () => d(async () => {
  let e = be();
  if (typeof e?.isSupported !== "function")
    return false;
  try {
    return await e.isSupported() === true;
  } catch {
    return false;
  }
}), authorization: () => te("authorization", vt), requestAuthorization: () => te("requestAuthorization", vt), list: () => te("list", (e) => Array.isArray(e) ? e.map(cn).filter((t) => t !== null) : []), schedule: (e) => {
  if (!e || typeof e !== "object" || typeof e.id !== "string")
    return Promise.reject(Object.assign(Error("schedule needs a plan with an id"), { code: "INVALID_ARGUMENT" }));
  return te("schedule", (t) => {
    let n = t && typeof t === "object" ? t : {}, r = { id: (typeof n.id === "string" ? n.id : e.id).toLowerCase() };
    if (Array.isArray(n.droppedAlerts) && n.droppedAlerts.length)
      r.droppedAlerts = n.droppedAlerts.filter((o) => typeof o === "string");
    return r;
  }, e);
}, remove: (e) => te("remove", (t) => t === true, e), removeAll: () => te("removeAll", (e) => typeof e === "number" && Number.isFinite(e) ? e : 0) };
function eo(e, t) {
  let n = t.delay ?? 500, r = t.tolerance ?? 10, o = null, i = null, a = false, s = () => {
    if (o)
      clearTimeout(o);
    if (o = null, i && !a)
      t.onPressEnd?.();
    i = null;
  }, l = (b) => {
    let c = b;
    if (c.button !== undefined && c.button !== 0)
      return;
    a = false, i = { x: c.clientX, y: c.clientY }, t.onPressStart?.(), o = setTimeout(() => {
      if (o = null, !i)
        return;
      a = true, t.onLongPress({ ...i }), i = null;
    }, n);
  }, f = (b) => {
    if (!i)
      return;
    let c = b;
    if (Math.hypot(c.clientX - i.x, c.clientY - i.y) > r)
      s();
  }, u = (b) => {
    if (!a)
      return;
    a = false, b.preventDefault(), b.stopPropagation();
  }, m = (b) => b.preventDefault();
  return e.addEventListener("pointerdown", l), e.addEventListener("pointermove", f), e.addEventListener("pointerup", s), e.addEventListener("pointercancel", s), e.addEventListener("pointerleave", s), e.addEventListener("click", u, true), e.addEventListener("contextmenu", m), () => {
    s(), e.removeEventListener("pointerdown", l), e.removeEventListener("pointermove", f), e.removeEventListener("pointerup", s), e.removeEventListener("pointercancel", s), e.removeEventListener("pointerleave", s), e.removeEventListener("click", u, true), e.removeEventListener("contextmenu", m);
  };
}
function un(e, t, n) {
  if (n <= 1 || t.width <= 0)
    return 0;
  let r = Math.floor((e - t.left) / t.width * n);
  return Math.max(0, Math.min(n - 1, r));
}
function to(e, t) {
  let n = null, r = null, o = false, i = 0, a = (c) => {
    let p = e.getBoundingClientRect();
    return un(c, { left: p.left + 2, width: p.width - 4 }, t.count());
  }, s = (c) => {
    let p = c;
    if (p.button !== undefined && p.button !== 0)
      return;
    let g = a(p.clientX);
    if (g !== t.selected())
      return;
    n = g, i = g, o = false, r = p.pointerId;
    try {
      e.setPointerCapture?.(p.pointerId);
    } catch {}
    t.onPress?.(true);
  }, l = (c) => {
    if (n === null)
      return;
    let p = a(c.clientX);
    if (p === i)
      return;
    o = true, i = p, t.onScrub(p);
  }, f = (c) => {
    if (n === null)
      return;
    if (r !== null)
      try {
        e.releasePointerCapture?.(r);
      } catch {}
    if (t.onPress?.(false), c && o)
      t.onCommit(i);
    else if (o)
      t.onScrub(n);
    n = null, r = null;
  }, u = (c) => {
    if (!o)
      return;
    o = false, c.preventDefault(), c.stopPropagation();
  }, m = () => f(true), b = () => f(false);
  return e.addEventListener("pointerdown", s), e.addEventListener("pointermove", l), e.addEventListener("pointerup", m), e.addEventListener("pointercancel", b), e.addEventListener("click", u, true), () => {
    e.removeEventListener("pointerdown", s), e.removeEventListener("pointermove", l), e.removeEventListener("pointerup", m), e.removeEventListener("pointercancel", b), e.removeEventListener("click", u, true);
  };
}
function no(e, t, n) {
  if (n <= 0)
    return null;
  switch (e) {
    case "ArrowRight":
    case "ArrowDown":
      return (t + 1) % n;
    case "ArrowLeft":
    case "ArrowUp":
      return (t - 1 + n) % n;
    case "Home":
      return 0;
    case "End":
      return n - 1;
    default:
      return null;
  }
}
function ro(e, t) {
  e.querySelectorAll('[role="tab"]')[t]?.focus();
}
function oo(e) {
  let t = (n) => {
    if (!n.target?.closest?.("[data-native-pressable]"))
      return;
    let o = M2("haptics.prepare");
    if (o)
      Promise.resolve().then(() => o("impact")).catch(() => {});
  };
  return e.addEventListener("touchstart", t, { passive: true, capture: true }), () => e.removeEventListener("touchstart", t, { capture: true });
}
var F2 = null;
function pn(e) {
  if (e.type !== "http")
    return true;
  let t = e.data ?? {}, n = typeof t.status === "number" ? t.status : 0;
  return t.error === true || n >= 400 || n === 0;
}
function wt() {
  return crashReporter.isAvailable();
}
function fn(e) {
  return async (t) => {
    if (!wt())
      return !e;
    return crashReporter.capture(t);
  };
}
var co = { start(e = {}) {
  if (F2)
    return F2;
  let t = re() || wt();
  if (!t && !e.key && !e.dsn)
    return null;
  let n = e.beforeBreadcrumb;
  return F2 = new E({ framework: "stacks-mobile", sdkName: "bughq.stacks.mobile", autoInstrument: { navigation: true, fetch: true, xhr: true }, ...e, heartbeat: t ? false : e.heartbeat, transport: t ? fn(Boolean(e.key || e.dsn)) : undefined, beforeBreadcrumb(r) {
    if (!pn(r))
      return null;
    let o = n ? n(r) : r;
    if (o === null)
      return null;
    let i = o || r;
    if (t)
      crashReporter.addBreadcrumb(i);
    return i;
  } }), F2;
}, async setUser(e) {
  let t = e === null || e === undefined || e === "" ? null : String(e);
  F2?.setUser(t === null ? null : { id: t }), await crashReporter.setUser(t);
}, capture(e, t) {
  F2?.captureException(e, t);
}, addBreadcrumb(e) {
  if (F2)
    F2.addBreadcrumb(e);
  else
    crashReporter.addBreadcrumb(e);
}, async flush() {
  await Promise.all([F2?.flush(), crashReporter.flush()]);
}, client() {
  return F2;
}, stop() {
  F2?.close(), F2 = null;
} };
function He(e) {
  let t = E2();
  try {
    return Boolean(t?.matchMedia?.(e).matches);
  } catch {
    return false;
  }
}
function St(e) {
  return e !== null && e !== undefined && e !== "false" && e !== "0";
}
function Rt() {
  let e = E2()?.document?.documentElement, t = Number.parseFloat(e?.style?.getPropertyValue("--craft-font-scale") || "");
  return { fontScale: Number.isFinite(t) && t > 0 ? t : 1, reduceMotion: St(e?.getAttribute("data-craft-reduce-motion")) || He("(prefers-reduced-motion: reduce)"), reduceTransparency: St(e?.getAttribute("data-craft-reduce-transparency")) || He("(prefers-reduced-transparency: reduce)"), colorScheme: e?.classList?.contains("dark") || He("(prefers-color-scheme: dark)") ? "dark" : "light" };
}
function mn(e) {
  let t = Rt(), n = Number(e?.fontScale);
  return { contentSizeCategory: typeof e?.contentSizeCategory === "string" ? e.contentSizeCategory : undefined, fontScale: Number.isFinite(n) && n > 0 ? n : t.fontScale, reduceMotion: typeof e?.reduceMotion === "boolean" ? e.reduceMotion : t.reduceMotion, reduceTransparency: typeof e?.reduceTransparency === "boolean" ? e.reduceTransparency : t.reduceTransparency, colorScheme: e?.colorScheme === "dark" || e?.colorScheme === "light" ? e.colorScheme : t.colorScheme };
}
function xt(e, t = {}) {
  if (t.immediate !== false)
    e(Rt());
  return W("craftAppearance", (n) => e(mn(n)));
}
function mo(e) {
  return W("craftResume", (t) => e({ backgroundedMs: Number(t.backgroundedMs) || 0 }));
}
function go(e) {
  return W("craftMemoryWarning", () => e());
}
function At(e) {
  return (t) => {
    Promise.resolve().then(() => e(t)).then(() => ae.complete(true), () => ae.complete(false));
  };
}
function ho(e) {
  let t = At(e);
  return W("craftSilentPush", (n) => t(n.payload ?? {}));
}
function bo(e) {
  let t = At(() => e());
  return W("craftBackgroundRefresh", () => t(undefined));
}
function _e() {
  if (typeof window > "u")
    return;
  return window;
}
function se(e = _e()) {
  if (!e)
    return 0;
  if (typeof e.scrollY === "number")
    return e.scrollY;
  if (typeof e.scrollTop === "number")
    return e.scrollTop;
  return e.document?.scrollingElement?.scrollTop ?? 0;
}
function hn(e, t = _e()) {
  if (!t)
    return () => {};
  let n = false, r = typeof requestAnimationFrame === "function" ? requestAnimationFrame : (i) => setTimeout(i, 16), o = () => {
    if (n)
      return;
    n = true, r(() => {
      n = false, e(se(t));
    });
  };
  return e(se(t)), t.addEventListener("scroll", o, { passive: true }), () => t.removeEventListener("scroll", o);
}
function bn(e, t) {
  let n = Math.max(0, -e), r = e <= 0 ? Math.max(0, t) * 0.5 : 0;
  return Math.round(Math.max(n, r));
}
function wo(e) {
  let t = e.host ?? _e();
  if (!t)
    return () => {};
  let n = e.threshold ?? 72, r = null, o = false, i = false, a = typeof requestAnimationFrame === "function" ? requestAnimationFrame : (g) => setTimeout(g, 16), s = null, l = (g) => {
    s = null, e.onPull?.(g, o, { bounce: Math.min(g, Math.max(0, -se(t))) });
  }, f = (g) => {
    let y = s !== null;
    if (s = g, y)
      return;
    a(() => {
      if (s !== null)
        l(s);
    });
  }, u = (g) => {
    let y = g.touches?.[0];
    return y ? y.clientY : null;
  }, m = (g) => {
    if (i || se(t) > 0)
      return;
    r = u(g), o = false;
  }, b = (g) => {
    if (r === null)
      return;
    let y = u(g);
    if (y === null)
      return;
    let h = bn(se(t), y - r);
    if (!o && h >= n)
      o = true, Promise.resolve(haptics.impact("medium")).catch(() => {});
    else if (o && h < n * 0.8)
      o = false;
    f(h);
  }, c = async () => {
    if (r === null)
      return;
    if (r = null, !o) {
      l(0);
      return;
    }
    o = false, i = true, l(n);
    try {
      await e.onRefresh();
    } finally {
      i = false, l(0);
    }
  }, p = () => {
    if (r === null)
      return;
    r = null, o = false, l(0);
  };
  return t.addEventListener("touchstart", m, { passive: true }), t.addEventListener("touchmove", b, { passive: true }), t.addEventListener("touchend", c), t.addEventListener("touchcancel", p), () => {
    s = null, t.removeEventListener("touchstart", m), t.removeEventListener("touchmove", b), t.removeEventListener("touchend", c), t.removeEventListener("touchcancel", p);
  };
}
function vn(e, t = 52) {
  let n = Math.max(1, t), r = Math.min(1, Math.max(0, e / n)), o = e < 0 ? 1 + Math.min(0.1, -e / 600) : 1;
  return { progress: Math.round(r * 1000) / 1000, stretch: Math.round(o * 1000) / 1000 };
}
function So(e, t = {}) {
  let n = "", r = () => t.title?.offsetHeight || t.height || 52;
  return hn((o) => {
    let i = vn(o, r()), a = `${i.progress}|${i.stretch}`;
    if (a === n)
      return;
    n = a, e.style.setProperty("--native-nav-progress", String(i.progress)), e.style.setProperty("--native-nav-stretch", String(i.stretch)), t.onChange?.(i);
  }, t.host);
}
function Ro(e) {
  if (!e || typeof window > "u")
    return;
  let t = window.document?.querySelector(e);
  return t ? t : undefined;
}
function Tt() {
  if (typeof window > "u")
    return;
  return window;
}
var kt = "__stxPushed";
var yn = "__stxScroll";
function wn(e = Tt()) {
  let t = e?.history?.state;
  if (t === null || t === undefined)
    return false;
  if (typeof t !== "object")
    return true;
  let n = t;
  if (kt in n)
    return n[kt] === true;
  return !(yn in n);
}
function Ao(e = Tt()) {
  if (!wn(e))
    return false;
  return e.history.back(), true;
}
function ko(e, t, n = 50) {
  let r = e[e.length - 1];
  if (e.length >= 2 && e[e.length - 2].path === t)
    e.pop();
  else if (!r || r.path !== t)
    e.push({ path: t, title: "" });
  if (e.length > n)
    e.splice(0, e.length - n);
  return { current: e[e.length - 1], previous: e[e.length - 2] ?? null };
}
function Eo(e, t, n = 12) {
  let r = e?.title.trim() ?? "";
  return r && r.length <= n ? r : t;
}
function To() {
  if (typeof window > "u")
    return [];
  let e = window;
  return e.__stacksNavTrail ??= [];
}
function Sn(e) {
  try {
    let t = new URL(e, "http://local");
    return `${t.pathname}${t.search}`;
  } catch {
    return e;
  }
}
function Oo() {
  if (typeof window > "u")
    return;
  let e = window.stxRouter;
  if (typeof e?.screens !== "function")
    return;
  let t = e.screens(), n = t.find((o) => o.active);
  if (!n)
    return;
  let r = t.filter((o) => o.tab === n.tab && o.depth < n.depth);
  if (!r.length)
    return null;
  return Sn(r.reduce((o, i) => i.depth > o.depth ? i : o).url);
}
function Po(e = typeof window > "u" ? undefined : window) {
  let t = e?.stxRouter;
  if (typeof t?.screens !== "function" || typeof e?.history?.go !== "function")
    return false;
  let n = t.screens(), r = n.find((a) => a.active);
  if (!r)
    return false;
  let o = n.filter((a) => a.tab === r.tab && a.depth < r.depth);
  if (!o.length)
    return false;
  let i = o.reduce((a, s) => s.depth < a.depth ? s : a);
  return e.history.go(i.depth - r.depth), true;
}
function Io(e, t) {
  for (let n = e.length - 1;n >= 0; n--)
    if (e[n].path === t)
      return e[n];
  return null;
}
function Rn(e, t = xn()) {
  let n;
  try {
    n = new URL(e);
  } catch {
    return null;
  }
  let r = `${n.search}${n.hash}`;
  if (n.protocol === "http:" || n.protocol === "https:") {
    if (!t || n.origin !== t)
      return null;
    return `${n.pathname || "/"}${r}`;
  }
  return `${`/${[n.host, n.pathname.replace(/^\/+/, "")].filter(Boolean).join("/")}`}${r}`;
}
function xn() {
  if (typeof window > "u")
    return;
  return window.location?.origin;
}
var Et = "stacks-mobile-deep-link";
function Mo(e, t) {
  let n = (r) => {
    let o = Rn(r);
    if (o)
      e(o);
  };
  return t.getInitialURL().then((r) => {
    if (!r)
      return;
    try {
      if (sessionStorage.getItem(Et) === r)
        return;
      sessionStorage.setItem(Et, r);
    } catch {}
    n(r);
  }).catch(() => {}), t.onLink((r, o) => {
    if (o?.initial)
      return;
    n(r);
  });
}
var Co = 5000;
function An(e, t, n = 5000) {
  let r = t.filter((o) => Number.isFinite(o.timestamp) && Number.isFinite(o.bpm) && o.bpm > 0).slice().sort((o, i) => o.timestamp - i.timestamp);
  if (!r.length)
    return e.slice();
  return e.map((o) => {
    let i = 0, a = r.length;
    while (i < a) {
      let u = i + a >> 1;
      if (r[u].timestamp < o.timestamp)
        i = u + 1;
      else
        a = u;
    }
    let s = r[i], l = r[i - 1], f = !s ? l : !l ? s : o.timestamp - l.timestamp <= s.timestamp - o.timestamp ? l : s;
    if (!f || Math.abs(f.timestamp - o.timestamp) > n)
      return o;
    return { ...o, heartRate: Math.round(f.bpm) };
  });
}
var kn = 6371008.8;
var Be = { distanceM: 0, movingS: 0, paceSPerKm: null, averagePaceSPerKm: null, speedMps: null, accuracyM: null, fixes: 0 };
var En = 30;
var Tn = En;
function On(e, t) {
  let n = Math.PI / 180, r = (t.latitude - e.latitude) * n, o = (t.longitude - e.longitude) * n, i = Math.sin(r / 2) ** 2 + Math.cos(e.latitude * n) * Math.cos(t.latitude * n) * Math.sin(o / 2) ** 2;
  return 2 * kn * Math.asin(Math.min(1, Math.sqrt(i)));
}
function No(e, t = 25) {
  let n = new Set;
  return e.filter((r) => Number.isFinite(r.latitude) && Number.isFinite(r.longitude) && Number.isFinite(r.timestamp) && Math.abs(r.latitude) <= 90 && Math.abs(r.longitude) <= 180 && Number.isFinite(r.accuracy) && r.accuracy >= 0 && r.accuracy <= t).sort((r, o) => r.timestamp - o.timestamp).filter((r) => {
    if (n.has(r.timestamp))
      return false;
    return n.add(r.timestamp), true;
  });
}
function Pn(e, t) {
  return Number.isFinite(e.latitude) && Number.isFinite(e.longitude) && Number.isFinite(e.timestamp) && Math.abs(e.latitude) <= 90 && Math.abs(e.longitude) <= 180 && Number.isFinite(e.accuracy) && e.accuracy >= 0 && e.accuracy <= t;
}
function ve(e = {}) {
  let t = e.maxAccuracyM ?? 25, n = (e.paceWindowS ?? 30) * 1000, r = [], o = 0, i = 0, a = null, s = 0, l = null, f = null, u = { ...Be };
  function m(c) {
    let p = r[r.length - 1], g = a ? (c.timestamp - a.timestamp) / 1000 : 0;
    if (a = c, s++, !p) {
      r.push({ fix: c, cumM: 0 });
      return;
    }
    if (g > Tn) {
      r.push({ fix: c, cumM: o });
      return;
    }
    let y = (c.timestamp - p.fix.timestamp) / 1000, h = On(p.fix, c), O = Math.min(10, Math.max(3, p.fix.accuracy, c.accuracy));
    if (h < O)
      return;
    if (o += h, y > 0 && h / y >= 0.5)
      i += y;
    r.push({ fix: c, cumM: o });
  }
  function b() {
    let c = r[r.length - 1];
    if (c) {
      let y = c.fix.timestamp - n, h = 0;
      while (h < r.length - 1 && r[h].fix.timestamp < y)
        h++;
      if (h)
        r = r.slice(h);
    }
    let p = null, g = null;
    if (c && a.timestamp - c.fix.timestamp <= n) {
      let y = r[0], h = c.cumM - y.cumM, O = (c.fix.timestamp - y.fix.timestamp) / 1000;
      if (h >= 20 && O > 0)
        g = h / O, p = O / (h / 1000);
    }
    return { distanceM: o, movingS: i, paceSPerKm: p, averagePaceSPerKm: o >= 50 && i > 0 ? i / (o / 1000) : null, speedMps: g, accuracyM: a ? a.accuracy : f, fixes: s };
  }
  return { get stats() {
    return u;
  }, get latestTimestamp() {
    return l;
  }, add(c) {
    if (c.length) {
      let p = c[c.length - 1];
      if (!a)
        f = p.accuracy ?? null;
      let g = a ? a.timestamp : -1 / 0, y = c.filter((h) => Pn(h, t) && h.timestamp > g).sort((h, O) => h.timestamp - O.timestamp);
      for (let h of y) {
        if (a && h.timestamp <= a.timestamp)
          continue;
        m(h);
      }
      for (let h of c)
        if (Number.isFinite(h.timestamp) && (l === null || h.timestamp > l))
          l = h.timestamp;
    }
    return u = b(), u;
  } };
}
function In(e, t = {}) {
  return ve(t).add(e);
}
function Do(e) {
  if (e == null || e <= 0 || !Number.isFinite(e) || e > 3600)
    return "–";
  let t = Math.round(e);
  return `${Math.floor(t / 60)}:${String(t % 60).padStart(2, "0")}`;
}
function Ho(e) {
  return e != null && e > 0 && Number.isFinite(e) ? (e * 3.6).toFixed(1) : "–";
}
var Ot = 3600;
var Mn = 30000;
function Ln(e, t, n) {
  if (!n || t <= Ot)
    return e;
  return Math.max(e, Math.min(Mn, Math.round(e * t / Ot)));
}
function _o(e) {
  let t = e.location, n = e.intervalMs ?? 3000, r = Be, o = ve(e), i = false, a = null, s = 0, l = e.heartRate, f = false, u = null, m = [], b = () => typeof document < "u" && document.visibilityState === "hidden", c = 0, p = null, g = Promise.resolve(), y = null, h = false, O = null;
  function P() {
    if (h)
      throw Object.assign(Error("The recording screen is no longer active"), { code: "RECORDING_CONFLICT" });
    if (t.supportsRecordingOwnership?.() !== true)
      throw Object.assign(Error("This host cannot protect native recording ownership"), { code: "RECORDING_OWNERSHIP_UNSUPPORTED" });
  }
  function S() {
    if (P(), !O)
      throw Object.assign(Error("A saved recording ID is required"), { code: "RECORDING_CONFLICT" });
    return O;
  }
  function R(v) {
    let A = g.then(v);
    return g = A.then(() => {}, () => {}), A;
  }
  function k() {
    if (p)
      return p;
    let v = c, A = O, I = (async () => {
      if (P(), !A)
        throw Object.assign(Error("A saved recording ID is required"), { code: "RECORDING_CONFLICT" });
      let L = o, C = L.latestTimestamp, U = await t.readRecording(C === null ? { expectedId: A } : { expectedId: A, since: C });
      if (v !== c || h || L !== o)
        return L.add(U);
      if (C !== null && U.length && U[0].timestamp <= C)
        i = true;
      return r = L.add(U), e.onUpdate?.(r), r;
    })().finally(() => {
      if (p === I)
        p = null;
    });
    return p = I, I;
  }
  function x() {
    if (H(), h)
      return;
    let v = s, A = () => {
      a = setTimeout(() => {
        if (a = null, h || v !== s)
          return;
        (b() ? Promise.resolve() : k().then(() => {}, () => {})).then(() => {
          if (!h && v === s)
            A();
        });
      }, Ln(n, r.fixes, i));
    };
    A();
  }
  function H() {
    if (s++, a)
      clearTimeout(a);
    a = null;
  }
  function G(v, A, I, L = ve(e)) {
    if (H(), c++, p = null, o = L, i = false, O = v, u = A, f = A !== null, m = [], r = I, !h)
      e.onUpdate?.(r);
  }
  async function me(v) {
    if (!l || !f || !u || h || l.supportsRecordingOwnership?.() !== true)
      return;
    await v(l, u).catch(() => {});
  }
  return { get stats() {
    return r;
  }, get recordingId() {
    return O;
  }, get heartRateRecordingId() {
    return u;
  }, get heartRate() {
    return m;
  }, start(v) {
    return y = null, R(async () => {
      if (P(), v && t.supportsRecordingIntentIdentity?.() !== true)
        throw Object.assign(Error("This host cannot start a registered route identity"), { code: "RECORDING_INTENT_IDENTITY_UNSUPPORTED" });
      if (v && (typeof v.recordingId !== "string" || !v.recordingId.trim()))
        throw Object.assign(Error("A registered recording ID is required"), { code: "INVALID_ARGUMENT" });
      let A = typeof e.locationOptions === "function" ? e.locationOptions() : e.locationOptions, I = await t.startRecording({ enableHighAccuracy: true, ...A, ...v ? { recordingId: v.recordingId } : {} });
      if (!I?.active || typeof I.id !== "string" || !I.id.trim())
        throw Object.assign(Error("The native recording did not provide an ID"), { code: "RECORDING_CONFLICT" });
      if (v && I.id !== v.recordingId)
        throw Object.assign(Error("The native route did not start with its registered ID"), { code: "RECORDING_CONFLICT" });
      let L = null;
      if (!h && l?.isAvailable() && l.supportsRecordingOwnership?.() === true && (!v || v.heartRateRecordingId && l.supportsRecordingIntentIdentity?.() === true))
        try {
          let C = await l.startRecording(v ? { recordingId: v.heartRateRecordingId } : undefined);
          if (v && C.id !== v.heartRateRecordingId)
            throw Object.assign(Error("The native heart rate did not start with its registered ID"), { code: "RECORDING_CONFLICT" });
          if (C.active && typeof C.id === "string" && C.id.trim())
            L = C.id;
        } catch {}
      return G(I.id, L, { ...Be }), x(), r;
    });
  }, attach(v) {
    return y = null, R(async () => {
      if (typeof v?.expectedId !== "string" || !v.expectedId.trim())
        throw Object.assign(Error("A saved recording ID is required"), { code: "RECORDING_CONFLICT" });
      P();
      let A = await t.getRecordingState({ expectedId: v.expectedId });
      if (P(), !A?.id)
        return null;
      if (A.id !== v.expectedId)
        throw Object.assign(Error("The recording belongs to another session"), { code: "RECORDING_CONFLICT" });
      let I = null;
      if (v.expectedHeartRateId !== undefined) {
        let U = v.expectedHeartRateId;
        if (typeof U !== "string" || !U.trim())
          throw Object.assign(Error("A saved heart-rate recording ID is required"), { code: "RECORDING_CONFLICT" });
        if (!l?.isAvailable() || l.supportsRecordingOwnership?.() !== true)
          throw Object.assign(Error("This host cannot protect heart-rate recording ownership"), { code: "RECORDING_OWNERSHIP_UNSUPPORTED" });
        let Vt = await l.getRecordingState({ expectedId: U });
        if (P(), Vt.id !== U)
          throw Object.assign(Error("The heart-rate recording belongs to another session"), { code: "RECORDING_CONFLICT" });
        await l.readRecording({ expectedId: U, since: Date.now() }), P(), I = U;
      }
      let L = await t.readRecording({ expectedId: v.expectedId });
      P();
      let C = ve(e);
      if (G(v.expectedId, I, C.add(L), C), A.active && !A.paused)
        x();
      return A;
    });
  }, pause() {
    return R(async () => {
      await t.pauseRecording({ expectedId: S() }), await me((v, A) => v.pauseRecording({ expectedId: A })), H(), await k().catch(() => {});
    });
  }, resume() {
    return R(async () => {
      await t.resumeRecording({ expectedId: S() }), await me((v, A) => v.resumeRecording({ expectedId: A })), x();
    });
  }, setPowerMode(v) {
    return R(async () => {
      if (h || y || !O || t.supportsRecordingPowerMode?.() !== true)
        return false;
      try {
        return await t.setRecordingPowerMode({ expectedId: O, powerMode: v }), true;
      } catch (A) {
        let I = A?.code;
        if (I === "NO_ACTIVE_RECORDING" || I === "RECORDING_POWER_MODE_UNSUPPORTED")
          return false;
        throw A;
      }
    });
  }, stop() {
    if (y)
      return y;
    let v = R(async () => {
      H(), c++;
      let A = S(), I = await t.stopRecording({ expectedId: A });
      if (I.id !== A)
        throw Object.assign(Error("The native recording identity changed"), { code: "RECORDING_CONFLICT" });
      let L = I?.locations ?? [];
      if (!h && l && f && u && l.supportsRecordingOwnership?.() === true) {
        let C = await l.stopRecording({ expectedId: u }).catch(() => null);
        f = false, m = C?.id === u ? C.samples : [], L = An(L, m);
      }
      if (r = In(L, e), !h)
        e.onUpdate?.(r);
      return L;
    }).catch((A) => {
      if (y === v)
        y = null;
      throw A;
    });
    return y = v, v;
  }, dispose() {
    h = true, c++, p = null, H();
  }, refresh: k };
}
function Fo(e) {
  return { startedAt: Number.isFinite(e) ? e : null, pausedAt: null, pausedMs: 0 };
}
function Uo(e, t) {
  return e.startedAt === null || e.pausedAt !== null || !Number.isFinite(t) ? e : { ...e, pausedAt: Math.max(e.startedAt, t) };
}
function Wo(e, t) {
  return e.pausedAt === null || !Number.isFinite(t) ? e : { ...e, pausedAt: null, pausedMs: e.pausedMs + Math.max(0, t - e.pausedAt) };
}
function $o(e, t) {
  if (e.startedAt === null)
    return 0;
  let n = ((e.pausedAt ?? t) - e.startedAt - e.pausedMs) / 1000;
  return Number.isFinite(n) ? Math.max(0, n) : 0;
}
var jo = 150;
function Cn(e, t) {
  let n = Math.PI / 180, r = (t.latitude - e.latitude) * n, o = (t.longitude - e.longitude) * n, i = Math.sin(r / 2) ** 2 + Math.cos(e.latitude * n) * Math.cos(t.latitude * n) * Math.sin(o / 2) ** 2;
  return 12742017.6 * Math.asin(Math.min(1, Math.sqrt(i)));
}
function ye(e, t) {
  let n = [...e].sort((r, o) => r - o);
  return n[Math.min(n.length - 1, Math.floor(t * n.length))];
}
function zo(e, t) {
  let n = (e || []).filter((a) => Number.isFinite(a?.latitude) && Number.isFinite(a?.longitude) && Math.abs(a.latitude) <= 90 && Math.abs(a.longitude) <= 180), r = n.filter((a) => a.accuracy != null).map((a) => Number(a.accuracy)).filter((a) => Number.isFinite(a) && a >= 0), o = r.length ? ye(r, 0.5) : Number.POSITIVE_INFINITY, i = 0;
  if (n.length) {
    let a = { latitude: ye(n.map((s) => s.latitude), 0.5), longitude: ye(n.map((s) => s.longitude), 0.5) };
    i = ye(n.map((s) => Cn(a, s)), 0.8);
  }
  if (n.length >= 10 && i > 150 && o <= 15)
    return "outside";
  if (t < 150)
    return "unsure";
  if (n.length < 3 || o > 30 || i < 25)
    return "indoors";
  if (i < 50 && o > 10)
    return "indoors";
  return "unsure";
}
function qo(e, t = {}) {
  let r = String(e || "").trim().toLowerCase().replace(",", ".").match(/^(\d+(?:\.\d*)?|\.\d+)\s*(km|k|m|mi)?$/);
  if (!r)
    return null;
  let o = Number(r[1]), i = r[2] || t.defaultUnit || (o > 100 ? "m" : "km"), a = i === "m" ? o / 1000 : i === "mi" ? o * 1.609344 : o;
  return Number.isFinite(a) && a >= 0 && a <= 2000 ? Math.round(a * 1000) / 1000 : null;
}
var Re = new Set;
var Pt = false;
var we = null;
function Nn(e) {
  return e.isConnected && e.getClientRects().length > 0;
}
function It() {
  return [...Re].find((e) => Nn(e.element));
}
function Se() {
  let e = It(), t = Boolean(e);
  if (t === Pt)
    return;
  if (Pt = t, t)
    Y.enable(e?.tintColor ? { tintColor: e.tintColor } : {});
  else
    Y.disable();
}
function Dn() {
  let e = It();
  if (!e) {
    Y.end();
    return;
  }
  Promise.resolve().then(() => e.run()).catch(() => {}).finally(() => Y.end());
}
function Yo(e, t) {
  let n = { element: e, tintColor: t.tintColor, run: t.onRefresh };
  Re.add(n);
  let r = e.ownerDocument?.defaultView;
  if (!we) {
    let o = Y.onRefresh(Dn), i = () => Se();
    r?.addEventListener("stx:load", i), we = () => {
      o(), r?.removeEventListener("stx:load", i);
    };
  }
  return Se(), r?.requestAnimationFrame?.(() => Se()), () => {
    if (Re.delete(n), Re.size === 0)
      we?.(), we = null;
    Se();
  };
}
var Qo = 0.5;
function Hn(e, t, n) {
  let r = [];
  if (n.includes("large") || n.length === 0)
    r.push({ name: "large", y: 0 });
  if (n.includes("medium"))
    r.push({ name: "medium", y: Math.max(0, Math.round(e - t * 0.5)) });
  return r.push({ name: "dismiss", y: Math.max(1, e) }), r.sort((o, i) => o.y - i.y);
}
function _n(e) {
  let { y: t, velocity: n, stops: r } = e, o = r.filter((s) => s.name !== "dismiss"), i = r.find((s) => s.name === "dismiss");
  if (o.length === 0)
    return "dismiss";
  if (n > 0.5)
    return (r.filter((l) => l.y > t + 1)[0] ?? i).name;
  if (n < -0.5) {
    let s = o.filter((l) => l.y < t - 1);
    return (s[s.length - 1] ?? o[0]).name;
  }
  let a = o[o.length - 1];
  if (t > a.y + (i.y - a.y) * 0.5)
    return "dismiss";
  return o.reduce((s, l) => Math.abs(l.y - t) < Math.abs(s.y - t) ? l : s).name;
}
function Bn(e, t = 400) {
  if (e <= 0)
    return 0;
  return e * t * 0.55 / (t + e * 0.55);
}
function Jo(e) {
  let { panel: t } = e, n = null, r = [], o = 0, i = () => e.viewport?.() ?? t.ownerDocument?.defaultView?.innerHeight ?? 800, a = () => Hn(t.offsetHeight || t.getBoundingClientRect().height, i(), e.detents()), s = (u) => {
    let m = u;
    if (m.button !== undefined && m.button !== 0)
      return;
    if (m.target?.closest?.("button, a, input, select, textarea, [role=button]"))
      return;
    let b = a().find((c) => c.name === e.detent())?.y ?? 0;
    n = { y: m.clientY, base: b, pointerId: m.pointerId }, o = b, r = [{ y: b, t: m.timeStamp }], t.classList.add("is-dragging");
    try {
      u.currentTarget?.setPointerCapture?.(m.pointerId);
    } catch {}
  }, l = (u) => {
    if (!n)
      return;
    let m = u, b = n.base + m.clientY - n.y;
    o = b < 0 ? -Bn(-b) : b, r.push({ y: o, t: m.timeStamp });
    while (r.length > 2 && m.timeStamp - r[0].t > 100)
      r.shift();
    t.style.transform = `translateY(${o}px)`;
    let c = t.offsetHeight || 1;
    t.parentElement?.style.setProperty("--native-sheet-presence", String(Math.max(0, Math.min(1, 1 - o / c))));
  }, f = (u) => {
    if (!n)
      return;
    let m = u;
    n = null;
    let b = r[0], c = Math.max(1, m.timeStamp - b.t), p = (o - b.y) / c;
    t.classList.remove("is-dragging"), t.style.transform = "", t.parentElement?.style.removeProperty("--native-sheet-presence"), e.onSettle(_n({ y: o, velocity: p, stops: a() }));
  };
  for (let u of e.handles)
    u.addEventListener("pointerdown", s), u.addEventListener("pointermove", l), u.addEventListener("pointerup", f), u.addEventListener("pointercancel", f);
  return () => {
    for (let u of e.handles)
      u.removeEventListener("pointerdown", s), u.removeEventListener("pointermove", l), u.removeEventListener("pointerup", f), u.removeEventListener("pointercancel", f);
  };
}
function Zo(e) {
  let t = e.ownerDocument;
  if (e.parentElement === t.body)
    return () => {};
  let n = t.createComment("native-sheet");
  return e.parentNode?.insertBefore(n, e), t.body.appendChild(e), () => {
    if (n.parentNode)
      n.parentNode.insertBefore(e, n);
    else
      e.remove();
    n.remove();
  };
}
var Fe = new WeakMap;
function ei(e, t) {
  let n = e.documentElement, r = Fe.get(e) ?? 0;
  if (!t) {
    let a = Math.max(0, r - 1);
    if (Fe.set(e, a), a === 0)
      n.removeAttribute("data-native-sheet-card");
    return;
  }
  if (Fe.set(e, r + 1), r > 0)
    return;
  let o = e.defaultView, i = (o?.scrollY ?? 0) + (o?.innerHeight ?? 800) / 2;
  n.style.setProperty("--native-sheet-card-origin", `${Math.round(i)}px`), n.setAttribute("data-native-sheet-card", "");
}
function Fn(e, t) {
  e.style.setProperty("--native-font-scale", String(t.fontScale)), e.toggleAttribute("data-native-reduce-motion", t.reduceMotion), e.toggleAttribute("data-native-reduce-transparency", t.reduceTransparency);
}
function Un(e) {
  let t = e.replace(/\s+/g, "").toLowerCase();
  return !t || t === "transparent" || /^rgba\(\d+,\d+,\d+,0(\.0+)?\)$/.test(t) || /\/0(\.0+)?\)$/.test(t);
}
function Wn(e) {
  let t = e.defaultView;
  if (!t?.getComputedStyle)
    return null;
  for (let n of [e.body, e.documentElement]) {
    if (!n)
      continue;
    let r = t.getComputedStyle(n).backgroundColor;
    if (r && !Un(r))
      return r;
  }
  return null;
}
function $n(e) {
  if (e.documentElement.classList.contains("dark"))
    return true;
  if (e.documentElement.classList.contains("light"))
    return false;
  return Boolean(e.defaultView?.matchMedia?.("(prefers-color-scheme: dark)").matches);
}
function oi(e, t = {}) {
  let n = t.root ?? e.documentElement;
  ie.setKeyboardAccessory(t.keyboardAccessory === true);
  let r = "", o = "", i = () => {
    let u = Wn(e);
    if (u && u !== r)
      r = u, ie.setUnderPageColor(u);
    let m = $n(e) ? "light" : "dark";
    if (m !== o)
      o = m, he.setStyle(m);
  }, a = xt((u) => {
    Fn(n, u), i();
  }), s = e.defaultView, l = typeof s?.MutationObserver === "function" ? new s.MutationObserver(i) : null;
  l?.observe(e.documentElement, { attributes: true, attributeFilter: ["class", "style", "data-theme"] });
  let f = s?.matchMedia?.("(prefers-color-scheme: dark)");
  return f?.addEventListener?.("change", i), s?.addEventListener("stx:load", i), i(), () => {
    a(), l?.disconnect(), f?.removeEventListener?.("change", i), s?.removeEventListener("stx:load", i);
  };
}
var ai = 64;
var Kn = /^[a-z][a-z0-9]*(?:-[a-z0-9]+)*$/;
var jn = /^(?:0|[1-9]\d*)$/;
function Lt(e) {
  let t = [], n = [], r = e && typeof e === "object" && !Array.isArray(e) ? e : {};
  for (let [o, i] of Object.entries(r)) {
    let a = i && typeof i === "object" ? i : null;
    if (!a) {
      n.push(`spotlight kind "${o}" is not an object`);
      continue;
    }
    let { slots: s, route: l } = a, f = typeof a.noun === "string" && a.noun.trim() ? a.noun.trim() : "Item";
    if (!Kn.test(o) || o.includes("-slot-")) {
      n.push(`spotlight kind "${o}" is not a usable name: lowercase letters, digits and single dashes, and never "-slot-"`);
      continue;
    }
    if (typeof s !== "number" || !Number.isInteger(s) || s <= 0 || s > 64) {
      n.push(`spotlight kind "${o}" needs slots between 1 and 64, not ${String(s)}`);
      continue;
    }
    if (typeof l !== "string" || !l.startsWith("/") || !l.includes(":id")) {
      n.push(`spotlight kind "${o}" needs a route starting with "/" and carrying ":id", not ${String(l)}`);
      continue;
    }
    t.push({ name: o, slots: s, route: l, noun: f });
  }
  return { kinds: t, problems: n };
}
function ce(e, t) {
  return e.find((n) => n.name === t) ?? null;
}
function le(e, t, n) {
  let r = ce(e, t);
  if (!r || !Number.isInteger(n) || n < 0 || n >= r.slots)
    return null;
  return `${t}-slot-${n}`;
}
function zn(e, t) {
  if (typeof t !== "string")
    return null;
  let n = t.lastIndexOf("-slot-");
  if (n <= 0)
    return null;
  let r = t.slice(0, n), o = t.slice(n + 6);
  if (!jn.test(o))
    return null;
  let i = Number(o);
  return le(e, r, i) === t ? { kind: r, slot: i } : null;
}
function Ct(e) {
  return e.flatMap((t) => Array.from({ length: t.slots }, (n, r) => `${t.name}-slot-${r}`));
}
function si(e, t) {
  let n = e && typeof e === "object" ? e : {};
  if (n.enabled === false)
    return [];
  let o = [...(Array.isArray(n.activityTypes) ? n.activityTypes.filter((i) => typeof i === "string" && i.trim().length > 0) : []).map((i) => i.trim()), ...Ct(Lt(n.kinds).kinds)];
  return [...new Set(o)].map((i) => `${t}.${i}`);
}
function Nt(e, t, n) {
  let r = typeof n.name === "string" ? n.name.replace(/\s+/g, " ").trim() : "";
  if (!r)
    return `${ce(e, t)?.noun ?? "Item"} #${n.id}`;
  return r.length > 120 ? `${r.slice(0, 119).trimEnd()}…` : r;
}
function qn(e, t, n, r, o = Date.now()) {
  let i = ce(e, n);
  if (!i || !Number.isInteger(r.id) || r.id <= 0)
    return null;
  let a = t.filter((p) => p.kind === n), s = Nt(e, n, r), l = a.find((p) => p.itemId === r.id) ?? null, f = l ? null : Xn(a, i.slots), u = l || f !== null ? null : Qn(a), m = l?.slot ?? f ?? u?.slot;
  if (m === undefined || m === null)
    return null;
  let b = { kind: n, slot: m, itemId: r.id, title: s, donatedAt: o }, c = t.filter((p) => p.kind !== n || p.slot !== m && p.itemId !== r.id);
  return { entries: Dt(e, [...c, b]), entry: b, evicted: u, changed: !l || l.title !== s };
}
function Vn(e, t, n) {
  let r = e.find((o) => o.kind === t && o.itemId === n) ?? null;
  return { entries: r ? e.filter((o) => o !== r) : [...e], removed: r };
}
function Gn(e, t, n) {
  let r = zn(e, n);
  if (!r)
    return null;
  let o = t.find((a) => a.kind === r.kind && a.slot === r.slot), i = ce(e, r.kind)?.route;
  return o && i ? i.replace(":id", String(o.itemId)) : null;
}
function Yn(e, t) {
  if (!Array.isArray(t))
    return [];
  let n = new Map, r = new Set;
  for (let o of t) {
    if (!o || typeof o !== "object")
      continue;
    let i = o, { kind: a, slot: s, itemId: l, title: f, donatedAt: u } = i;
    if (typeof a !== "string" || typeof s !== "number" || le(e, a, s) === null)
      continue;
    if (typeof l !== "number" || !Number.isInteger(l) || l <= 0)
      continue;
    let m = `${a}-slot-${s}`, b = `${a}#${l}`;
    if (n.has(m) || r.has(b))
      continue;
    n.set(m, { kind: a, slot: s, itemId: l, title: typeof f === "string" && f.trim() ? f : Nt(e, a, { id: l }), donatedAt: typeof u === "number" && Number.isFinite(u) && u > 0 ? u : 0 }), r.add(b);
  }
  return Dt(e, [...n.values()]);
}
function Dt(e, t) {
  let n = new Map(e.map((r, o) => [r.name, o]));
  return [...t].sort((r, o) => (n.get(r.kind) ?? 0) - (n.get(o.kind) ?? 0) || r.slot - o.slot);
}
function Xn(e, t) {
  let n = new Set(e.map((r) => r.slot));
  for (let r = 0;r < t; r++)
    if (!n.has(r))
      return r;
  return null;
}
function Qn(e) {
  return e.reduce((t, n) => !t || n.donatedAt < t.donatedAt ? n : t, null);
}
function Jn() {
  let e = globalThis.craft;
  return e && typeof e === "object" ? e.siri : undefined;
}
var Zn = "stacks_spotlight_index";
var er = 3000;
function li(e) {
  let t = e.onProblem ?? ((S) => console.warn(`[spotlight] ${S}`)), n = Array.isArray(e.kinds) ? { kinds: [...e.kinds], problems: [] } : Lt(e.kinds);
  for (let S of n.problems)
    t(S);
  let r = e.enabled === false ? [] : n.kinds, o = e.storageKey ?? Zn, i = e.legacyStorageKeys ?? [], a = e.timeoutMs ?? er, s = e.now ?? (() => Date.now()), l = e.bridge ?? Jn, f = null;
  function u() {
    try {
      return typeof localStorage > "u" ? null : localStorage;
    } catch {
      return null;
    }
  }
  function m() {
    if (f)
      return f;
    f = [];
    let S = u();
    if (!S)
      return f;
    try {
      let R = [o, ...i].map((k) => S.getItem(k)).find((k) => k);
      f = R ? Yn(r, JSON.parse(R)) : [];
    } catch {
      f = [];
    }
    return f;
  }
  function b(S) {
    f = S;
    let R = u();
    if (!R)
      return;
    try {
      R.setItem(o, JSON.stringify(S));
      for (let k of i)
        R.removeItem(k);
    } catch {}
  }
  async function c(S) {
    if (!S)
      return null;
    let R;
    try {
      return await Promise.race([S, new Promise((k) => {
        R = setTimeout(() => k(null), a);
      })]);
    } catch {
      return null;
    } finally {
      if (R !== undefined)
        clearTimeout(R);
    }
  }
  let p = Promise.resolve();
  function g(S) {
    let R = p.then(S, S);
    return p = R.catch(() => {
      return;
    }), R;
  }
  async function y(S, R) {
    let k = l()?.register;
    if (!k || r.length === 0)
      return false;
    return g(async () => {
      let x = qn(r, m(), S, R, s()), H = x && le(r, S, x.entry.slot);
      if (!x || !H)
        return false;
      if (!x.changed)
        return b(x.entries), true;
      let G = await c(k(x.entry.title, H)) !== null;
      if (G)
        b(x.entries);
      return G;
    });
  }
  async function h(S, R) {
    let k = l()?.remove;
    if (!k)
      return false;
    return g(async () => {
      let { entries: x, removed: H } = Vn(m(), S, R);
      if (!H)
        return false;
      let G = le(r, S, H.slot), me = G ? await c(k(G)) !== null : false;
      return b(x), me;
    });
  }
  async function O(S, R) {
    let k = ce(r, S)?.slots;
    if (!k || !l()?.register)
      return 0;
    let x = 0;
    for (let H of [...R].slice(0, k).reverse())
      if (await y(S, H))
        x++;
    return x;
  }
  async function P() {
    let S = l()?.remove;
    if (!S)
      return b([]), 0;
    return g(async () => {
      let R = 0;
      for (let k of m()) {
        let x = le(r, k.kind, k.slot);
        if (x && await c(S(x)) !== null)
          R++;
      }
      return b([]), R;
    });
  }
  return { kinds: r, index: y, sync: O, remove: h, clear: P, routeFor: (S) => Gn(r, m(), S), entries: () => m(), activityTypes: (S) => Ct(r).map((R) => `${S}.${R}`), reset: () => {
    f = null;
  } };
}
var Mt = ["craftShortcut", "craftSiriShortcut"];
function ci(e, t) {
  let n = (r) => {
    let o = r.detail, i = typeof o === "string" ? o : o && typeof o === "object" ? o.action ?? o.type : null, a = typeof i === "string" ? e.routeFor(i) : null;
    if (a)
      t(a);
  };
  if (typeof globalThis.addEventListener !== "function")
    return () => {};
  for (let r of Mt)
    globalThis.addEventListener(r, n);
  return () => {
    for (let r of Mt)
      globalThis.removeEventListener(r, n);
  };
}
var nr = tabBar;
function rr(e) {
  return Array.from(e.querySelectorAll("a[data-native-tab]")).map((t) => ({ id: t.getAttribute("href") || "", title: t.getAttribute("data-native-tab") || t.getAttribute("aria-label") || "", symbol: t.getAttribute("data-native-tab-symbol") || "circle", badge: (t.querySelector(".native-tab-badge")?.textContent || "").trim(), current: t.hasAttribute("data-stx-nav-current") || t.classList.contains("is-active") })).filter((t) => t.id && t.title);
}
function or(e) {
  return { tabs: e.map(({ id: n, title: r, symbol: o, badge: i }) => i ? { id: n, title: r, symbol: o, badge: i } : { id: n, title: r, symbol: o }), selected: e.find((n) => n.current)?.id };
}
function _t() {
  if (typeof window > "u")
    return;
  let e = window.stxRouter;
  return e && typeof e === "object" ? e : undefined;
}
function ir() {
  return typeof _t()?.selectTab === "function";
}
function pi(e, t = {}) {
  let n = (r) => {
    if (ir() || r.defaultPrevented)
      return;
    let o = r.target?.closest?.("a[data-native-tab]");
    if (!o || !e.contains(o))
      return;
    if (!o.hasAttribute("data-stx-nav-current") && !o.classList.contains("is-active") && o.getAttribute("aria-current") !== "page")
      return;
    r.preventDefault();
    let i = e.ownerDocument.defaultView;
    if (t.scrollToTop)
      t.scrollToTop();
    else
      i?.scrollTo?.({ top: 0, behavior: i.matchMedia?.("(prefers-reduced-motion: reduce)").matches ? "auto" : "smooth" });
    i?.dispatchEvent(new CustomEvent("stx:tabreselect", { detail: { href: o.getAttribute("href") || "" } }));
  };
  return e.addEventListener("click", n), () => e.removeEventListener("click", n);
}
function Ht(e) {
  let t = e.trim();
  return /^#[0-9a-f]{6}$/i.test(t) ? t : undefined;
}
var Ue = "stacks:tab-bar-cover";
function fi(e, t) {
  if (t)
    e.setAttribute("data-native-covers-tab-bar", "");
  else
    e.removeAttribute("data-native-covers-tab-bar");
  e.ownerDocument?.defaultView?.dispatchEvent(new Event(Ue));
}
function mi(e, t = {}) {
  let n = t.api ?? nr;
  if (!n.isAvailable())
    return null;
  let r = t.hidden ?? (() => Boolean(e.ownerDocument?.querySelector("[data-native-hide-tab-bar], [data-native-covers-tab-bar]"))), o = typeof getComputedStyle === "function" ? getComputedStyle(e) : null, i = Ht(o?.getPropertyValue("--native-tab-active") || ""), a = Ht(o?.getPropertyValue("--native-tab-active-dark") || ""), s = "", l = () => {
    if (r()) {
      if (s !== "hidden")
        n.hide();
      s = "hidden";
      return;
    }
    let { tabs: b, selected: c } = or(rr(e)), p = JSON.stringify({ tabs: b, selected: c });
    if (p === s)
      return;
    let g = s && s !== "hidden" ? JSON.parse(s) : null;
    if (g && c && JSON.stringify(g.tabs) === JSON.stringify(b))
      n.select(c);
    else
      n.set(b, { selected: c, tint: i, tintDark: a });
    s = p;
  }, f = typeof MutationObserver === "function" ? new MutationObserver(l) : null;
  f?.observe(e, { attributes: true, attributeFilter: ["data-stx-nav-current", "class"], childList: true, subtree: true, characterData: true });
  let u = n.onSelect((b) => {
    let c = _t();
    if (c?.selectTab) {
      c.selectTab(b);
      return;
    }
    Array.from(e.querySelectorAll("a[data-native-tab]")).find((g) => g.getAttribute("href") === b)?.click();
  }), m = () => l();
  if (typeof window < "u")
    window.addEventListener("stx:load", m), window.addEventListener("stx:screen-shown", m), window.addEventListener(Ue, m);
  return l(), () => {
    if (f?.disconnect(), u(), typeof window < "u")
      window.removeEventListener("stx:load", m), window.removeEventListener("stx:screen-shown", m), window.removeEventListener(Ue, m);
    n.hide();
  };
}
function ar(e = {}) {
  let t = e.maxSeconds ?? 300, n = e.maxBytes ?? 12582912;
  if (![t, n].every((g) => Number.isSafeInteger(g) && g > 0) || t > 300)
    throw TypeError("Invalid voice recording limits");
  let r = { status: "idle", audio: null, error: null }, o = new Set, i = {}, a = null, s = null, l = null, f, u = (g) => {
    r = g;
    for (let y of o)
      y({ ...g });
  }, m = () => {
    clearTimeout(f), l?.getTracks().forEach((g) => g.stop()), l = null;
  };
  function b() {
    if (i = {}, a) {
      let y = a;
      a = null, Promise.resolve(M2("audioRecording.cancel")?.(y)).catch(() => {});
    }
    let g = s;
    if (s = null, g && g.state !== "inactive")
      g.stop();
    m(), u({ status: "idle", audio: null, error: null });
  }
  async function c() {
    b();
    let g = i;
    u({ status: "requesting", audio: null, error: null });
    try {
      let y = M2("audioRecording.start");
      if (y) {
        let x = globalThis.crypto.randomUUID();
        if (a = x, await y(x, { maxSeconds: t }), i !== g)
          return;
        f = setTimeout(() => {
          if (i === g)
            p();
        }, t * 1000 - 250), u({ status: "recording", audio: null, error: null });
        return;
      }
      if (typeof navigator > "u" || !navigator.mediaDevices?.getUserMedia || typeof MediaRecorder > "u")
        throw Error("Microphone recording is unavailable. Upload an audio recording instead.");
      let h = await navigator.mediaDevices.getUserMedia({ audio: { channelCount: 1 }, video: false });
      if (i !== g) {
        h.getTracks().forEach((x) => x.stop());
        return;
      }
      l = h;
      let O = ["audio/webm;codecs=opus", "audio/mp4", "audio/webm"].find((x) => MediaRecorder.isTypeSupported(x)), P = new MediaRecorder(h, { ...O ? { mimeType: O } : {}, audioBitsPerSecond: 32000 });
      s = P;
      let S = [], R = 0, k = false;
      P.ondataavailable = (x) => {
        if (i !== g || !x.data.size)
          return;
        if (R += x.data.size, R > n) {
          if (k = true, S.length = 0, P.state !== "inactive")
            P.stop();
          m();
          return;
        }
        if (!k)
          S.push(x.data);
      }, P.onerror = () => {
        if (i !== g)
          return;
        b(), u({ status: "error", audio: null, error: "Recording failed. Please try again." });
      }, P.onstop = () => {
        if (i !== g)
          return;
        s = null, m();
        let x = new Blob(S, { type: P.mimeType || O || "audio/webm" });
        u(k || !x.size ? { status: "error", audio: null, error: k ? "The recording exceeds the upload limit." : "The recording was empty." } : { status: "ready", audio: x, error: null });
      }, P.start(1000), f = setTimeout(() => {
        if (i === g && P.state !== "inactive")
          P.stop();
      }, t * 1000 - 250), u({ status: "recording", audio: null, error: null });
    } catch (y) {
      if (i !== g)
        return;
      b(), u({ status: "error", audio: null, error: y instanceof Error ? y.message : "Microphone permission was refused." });
    }
  }
  async function p() {
    if (!a) {
      if (s && s.state !== "inactive")
        s.stop();
      return;
    }
    let g = i, y = a;
    clearTimeout(f);
    try {
      let h = await M2("audioRecording.stop")?.(y);
      if (i !== g)
        return;
      if (!h?.path || !h.size || h.size > n || !Number.isFinite(h.durationSeconds) || h.durationSeconds <= 0 || h.durationSeconds > t + 1)
        throw Error("The recording is empty or exceeds its limits.");
      u({ status: "ready", audio: h, error: null });
    } catch (h) {
      if (i !== g)
        return;
      b(), u({ status: "error", audio: null, error: h instanceof Error ? h.message : "Recording failed." });
    }
  }
  return { start: c, cancel: b, dispose() {
    b(), o.clear();
  }, stop: p, supported: () => Boolean(M2("audioRecording.start")) || typeof navigator < "u" && Boolean(navigator.mediaDevices?.getUserMedia) && typeof MediaRecorder < "u", snapshot: () => ({ ...r }), subscribe(g) {
    return o.add(g), g({ ...r }), () => {
      o.delete(g);
    };
  } };
}
function sr(e, t = {}, n = "audio") {
  if (!n || Object.hasOwn(t, n))
    throw TypeError("Use a distinct recording field name");
  let r = new FormData;
  if (typeof Blob < "u" && e instanceof Blob)
    r.append(n, e, "feedback");
  else {
    if (!e || !("path" in e) || typeof e.path !== "string" || !e.path || !M2("audioRecording.stop"))
      throw TypeError("A native recording requires its native upload host");
    Reflect.apply(r.append, r, [n, e]);
    let o = r.get(n);
    if (!o || typeof o !== "object" || !("path" in o) || o.path !== e.path)
      throw TypeError("The upload host did not preserve the native recording file");
  }
  for (let [o, i] of Object.entries(t)) {
    if (typeof i !== "string")
      throw TypeError("Upload fields must be strings");
    r.append(o, i);
  }
  return r;
}
var dr = { isAvailable: () => d(() => biometrics.isAvailable()), getBiometricType: () => d(() => biometrics.getBiometricType()), authenticate: (e) => d(() => biometrics.authenticate(e)) };
var pr = { takePicture: (e) => d(() => camera.takePicture(e)), pickImage: () => d(() => camera.pickImage()), pickMultiple: (e) => d(() => camera.pickMultiple(e)), isAvailable: () => d(() => camera.isAvailable()) };
var fr = { getInfo: () => d(() => device.getInfo()), getCapabilities: () => d(() => device.getCapabilities()), isMobile: () => device.isMobile(), isIOS: () => device.isIOS(), isAndroid: () => device.isAndroid(), getLocale: () => device.getLocale(), getTimezone: () => device.getTimezone() };
var mr = lifecycle;
function z() {
  return V()?.capabilities.locationRecordingOwnership === true && location.supportsRecordingOwnership?.() === true;
}
function $t() {
  return z() && V()?.capabilities.locationRecordingPowerMode === true && location.supportsRecordingPowerMode?.() === true;
}
function X() {
  return V()?.capabilities.heartRateRecordingOwnership === true && heartRate.supportsRecordingOwnership?.() === true;
}
function Kt() {
  return z() && V()?.capabilities.locationRecordingIntentIdentity === true && location.supportsRecordingIntentIdentity?.() === true;
}
function jt() {
  return X() && V()?.capabilities.heartRateRecordingIntentIdentity === true && heartRate.supportsRecordingIntentIdentity?.() === true;
}
function qt(e, t, n) {
  return d(async () => {
    let r = e && Object.hasOwn(e, "recordingId");
    if (r) {
      if (!t())
        throw Object.assign(Error("This host or adapter cannot start a registered recording identity"), { code: "RECORDING_INTENT_IDENTITY_UNSUPPORTED" });
      if (typeof e.recordingId !== "string" || !e.recordingId.trim())
        throw Object.assign(Error("A registered recording ID is required"), { code: "INVALID_ARGUMENT" });
    }
    let o = await n();
    if (r && o.id !== e.recordingId)
      throw Object.assign(Error("The native recording identity changed at start"), { code: "RECORDING_CONFLICT" });
    return o;
  });
}
function B2(e, t, n) {
  return d(() => {
    if (e && Object.hasOwn(e, "expectedId")) {
      if (!t())
        throw Object.assign(Error("This host or adapter cannot protect recording ownership"), { code: "RECORDING_OWNERSHIP_UNSUPPORTED" });
      if (typeof e.expectedId !== "string" || !e.expectedId.trim())
        throw Object.assign(Error("A saved recording ID is required"), { code: "RECORDING_CONFLICT" });
    }
    return n();
  });
}
var gr = { supportsRecordingOwnership: z, supportsRecordingIntentIdentity: Kt, supportsRecordingPowerMode: $t, setRecordingPowerMode: (e) => d(() => {
  if (!$t())
    throw Object.assign(Error("This host cannot change the recording power mode"), { code: "RECORDING_POWER_MODE_UNSUPPORTED" });
  return B2(e, z, () => location.setRecordingPowerMode(e));
}), acknowledgeRecording: (e) => B2({ expectedId: e?.expectedId }, z, () => location.acknowledgeRecording(e)), getCurrentPosition: (e) => d(() => location.getCurrentPosition(e)), watchPosition: (e, t) => location.watchPosition(e, t), clearWatch: (e) => location.clearWatch(e), startRecording: (e) => qt(e, Kt, () => location.startRecording(e)), pauseRecording: (e) => B2(e, z, () => location.pauseRecording(e)), resumeRecording: (e) => B2(e, z, () => location.resumeRecording(e)), stopRecording: (e) => B2(e, z, () => location.stopRecording(e)), getRecordingState: (e) => B2(e, z, () => location.getRecordingState(e)), readRecording: (e) => B2(e, z, () => location.readRecording(e)) };
var hr = { show: (e) => d(() => notifications.show(e)), schedule: (e) => d(() => notifications.schedule(e)), cancel: (e) => d(() => notifications.cancel(e)), cancelAll: () => d(() => notifications.cancelAll()), setBadge: (e) => d(() => notifications.setBadge(e)) };
var br = { check: (e) => d(() => permissions.check(e)), request: (e) => d(() => permissions.request(e)), checkMultiple: (e) => d(() => permissions.checkMultiple(e)), requestMultiple: (e) => d(() => permissions.requestMultiple(e)), openSettings: () => d(() => permissions.openSettings()) };
var vr = { set: (e, t) => d(() => secureStorage.set(e, t)), get: (e) => d(() => secureStorage.get(e)), delete: (e) => d(() => secureStorage.delete(e)), clear: () => d(() => secureStorage.clear()) };
var yr = { share: (e) => d(() => share.share(e)), isAvailable: () => share.isAvailable() };
var wr = { request: () => d(() => appReview.request()) };
var Oe = { impact: (e) => Promise.resolve().then(() => haptics.impact(e)).catch(() => {}), notification: (e) => Promise.resolve().then(() => haptics.notification(e)).catch(() => {}), selection: () => Promise.resolve().then(() => haptics.selection()).catch(() => {}), vibrate: (e) => Promise.resolve().then(() => haptics.vibrate(e)).catch(() => {}), prepare: (e) => {
  let t = M2("haptics.prepare");
  return t ? Promise.resolve().then(() => t(e)).then(() => {}, () => {}) : Promise.resolve();
} };
function zt(e) {
  if (typeof e === "string")
    return e.trim() || null;
  if (!e || typeof e !== "object")
    return null;
  let t = e.url;
  return typeof t === "string" && t.trim() ? t : null;
}
var Sr = { async getInitialURL() {
  if (!await ee())
    return null;
  return zt(await deepLinks.getInitialURL?.());
}, onLink(e) {
  let t = null, n = false, r = () => {
    if (n)
      return;
    t = deepLinks.onLink?.((o, i) => {
      let a = zt(o);
      if (a)
        e(a, { initial: i?.initial === true });
    }) ?? null;
  };
  if (Pe()?.craft)
    r();
  else
    ee().then(r);
  return () => {
    n = true, t?.();
  };
} };
var Ai = { isAvailable: () => snapshots.isAvailable(), set: (e, t) => snapshots.set(e, t), remove: (e) => snapshots.remove(e), clear: () => snapshots.clear() };
var Rr = { enable: () => d(() => keepAwake.enable()), disable: () => d(() => keepAwake.disable()) };
var xr = { isAvailable: () => brightness.isAvailable(), get: () => d(() => brightness.get()), set: (e) => d(() => brightness.set(e)), restore: () => d(() => brightness.restore()) };
var Ar = { isAvailable: () => music.isAvailable(), supports: (e) => music.supports(e), getAuthorizationStatus: () => d(() => music.getAuthorizationStatus()), requestAuthorization: () => d(() => music.requestAuthorization()), getNowPlaying: () => d(() => music.getNowPlaying()), play: () => d(() => music.play()), pause: () => d(() => music.pause()), togglePlayPause: () => d(() => music.togglePlayPause()), skipToNext: () => d(() => music.skipToNext()), skipToPrevious: (e) => d(() => music.skipToPrevious(e)), onChange: (e) => J(() => music.onChange(e)) };
var kr = { supportsRecordingOwnership: X, supportsRecordingIntentIdentity: jt, acknowledgeRecording: (e) => B2({ expectedId: e?.expectedId }, X, () => heartRate.acknowledgeRecording(e)), isAvailable: () => heartRate.isAvailable(), supports: (e) => heartRate.supports(e), getState: () => d(() => heartRate.getState()), requestAuthorization: () => d(() => heartRate.requestAuthorization()), scan: (e) => d(() => heartRate.scan(e)), stopScan: () => d(() => heartRate.stopScan()), getDevices: () => d(() => heartRate.getDevices()), connect: (e) => d(() => heartRate.connect(e)), reconnect: () => d(() => heartRate.reconnect()), disconnect: (e) => d(() => heartRate.disconnect(e)), startRecording: (e) => qt(e, jt, () => heartRate.startRecording(e)), pauseRecording: (e) => B2(e, X, () => heartRate.pauseRecording(e)), resumeRecording: (e) => B2(e, X, () => heartRate.resumeRecording(e)), stopRecording: (e) => B2(e, X, () => heartRate.stopRecording(e)), getRecordingState: (e) => B2(e, X, () => heartRate.getRecordingState(e)), readRecording: (e) => B2(e, X, () => heartRate.readRecording(e)), onReading: (e) => J(() => heartRate.onReading(e)), onDevice: (e) => J(() => heartRate.onDevice(e)), onState: (e) => J(() => heartRate.onState(e)) };
var Er = { isAvailable: () => speech.isAvailable(), speak: (e, t) => d(() => speech.speak(e, t)), stop: () => d(() => speech.stop()) };
var Tr = { getStatus: () => d(() => network.getStatus()), onChange: (e) => J(() => network.onChange(e)) };
var Or = { register: () => d(() => pushNotifications.register()), onToken: (e) => pushNotifications.onToken(e), onNotification: (e) => J(() => pushNotifications.onNotification(e)) };
var Pr = { requestAuthorization: (e, t) => d(() => health.requestAuthorization(e, t)), getData: (e, t) => d(() => health.getData(e, t)), saveWorkout: (e) => d(() => health.saveWorkout(e)), getWorkouts: (e) => d(() => health.getWorkouts(e)), getDailyStatistics: (e, t) => d(() => health.getDailyStatistics(e, t)), getHeartRateSamples: (e) => w("health.getHeartRateSamples", [e ?? {}], () => []).then((t) => Array.isArray(t) ? t : []), getSamples: (e, t) => w("health.getSamples", [e, t ?? {}], () => []).then((n) => Array.isArray(n) ? n : []), getSleepIntervals: (e) => w("health.getSleepIntervals", [e ?? {}], () => []).then((t) => Array.isArray(t) ? t : []), saveMindfulSession: (e) => w("health.saveMindfulSession", [e], () => null).then((t) => t ?? null), getMindfulSessions: (e) => w("health.getMindfulSessions", [e ?? {}], () => []).then((t) => Array.isArray(t) ? t : []), startHeartRateUpdates: (e) => w("health.startHeartRateUpdates", [e ?? {}], () => false).then((t) => t !== false), stopHeartRateUpdates: () => w("health.stopHeartRateUpdates", [], () => true).then(() => true), onHeartRate: (e) => W("craftHealthHeartRate", (t) => {
  if (Array.isArray(t.samples) && t.samples.length)
    e(t.samples);
}), supports: (e) => M2(`health.${e}`) !== null };
var Ir = { start: (e) => d(() => liveActivities.start(e)), update: (e) => d(() => liveActivities.update(e)), end: () => d(() => liveActivities.end()) };
var Mr = { send: (e) => d(() => watchConnectivity.send(e)), updateContext: (e) => d(() => watchConnectivity.updateContext(e)), isReachable: () => d(() => watchConnectivity.isReachable()), onMessage: (e) => watchConnectivity.onMessage(e), onReachabilityChange: (e) => watchConnectivity.onReachabilityChange(e) };
var ki = splash;
function Pe() {
  return E2();
}
function V() {
  let e = Pe()?.craft;
  if (!e || typeof e !== "object")
    return null;
  if (!("platform" in e) || e.platform !== "ios" && e.platform !== "android")
    return null;
  let t = "capabilities" in e ? e.capabilities : undefined, n = t && typeof t === "object" && !Array.isArray(t) ? Object.fromEntries(Object.entries(t).filter(([, r]) => typeof r === "boolean")) : {};
  return { platform: e.platform, capabilities: n };
}
function ze() {
  return V() !== null;
}
function Lr(e = 2000) {
  if (ze() || re())
    return Promise.resolve(true);
  let t = Pe();
  if (!t || !(t.craft || t.webkit?.messageHandlers?.craft))
    return Promise.resolve(false);
  return new Promise((n) => {
    let r = () => {
      clearTimeout(o), t.removeEventListener("craftReady", r), n(ze());
    }, o = setTimeout(r, e);
    t.addEventListener("craftReady", r, { once: true });
  });
}
function Cr(e) {
  let t = Pe();
  if (!t)
    return () => {};
  if (V()) {
    let r = false;
    return queueMicrotask(() => {
      if (!r)
        e(new Event("craftReady"));
    }), () => {
      r = true;
    };
  }
  let n = (r) => {
    if (!V())
      return;
    t.removeEventListener("craftReady", n), e(r);
  };
  return t.addEventListener("craftReady", n), () => t.removeEventListener("craftReady", n);
}
async function Nr(e) {
  await Oe.impact("light");
  try {
    let t = await e();
    return await Oe.notification("success"), t;
  } catch (t) {
    throw await Oe.notification("error"), t;
  }
}
var Ei = { get nativeBridge() {
  return V();
}, biometrics: dr, camera: pr, device: fr, haptics: Oe, lifecycle: mr, location: gr, notifications: hr, permissions: br, secureStorage: vr, storage: ht, crypto: bt, share: yr, appReview: wr, deepLinks: Sr, keepAwake: Rr, brightness: xr, music: Ar, heartRate: kr, scheduledWorkouts: yt, speech: Er, network: Tr, pushNotifications: Or, health: Pr, liveActivities: Ir, watchConnectivity: Mr, dialog: oe, contextMenu: De, browser: ot, symbols: it, statusBar: he, chrome: ie, refresh: Y, background: ae, clipboard: at, db: st, files: lt, shortcuts: ct, widgets: ut, orientation: dt, auth: pt, storeKit: ft, isNativeMobile: ze, whenNative: Lr, onReady: Cr, withFeedback: Nr };

// storage/framework/stx/bundle-tmp/0d49d93d0de8.ts
globalThis.__stxModules = globalThis.__stxModules || {};
if (!globalThis.__stxModules["npm:@stacksjs/components/overlays"])
  globalThis.__stxModules["npm:@stacksjs/components/overlays"] = exports_overlays;
if (!globalThis.__stxModules["npm:@stacksjs/mobile"])
  globalThis.__stxModules["npm:@stacksjs/mobile"] = exports_dist;
return {  };
})();