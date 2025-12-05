var __defProp = Object.defineProperty;
var __getOwnPropDesc = Object.getOwnPropertyDescriptor;
var __getOwnPropNames = Object.getOwnPropertyNames;
var __hasOwnProp = Object.prototype.hasOwnProperty;
var __export = (target, all) => {
  for (var name in all)
    __defProp(target, name, { get: all[name], enumerable: true });
};
var __copyProps = (to, from, except, desc) => {
  if (from && typeof from === "object" || typeof from === "function") {
    for (let key of __getOwnPropNames(from))
      if (!__hasOwnProp.call(to, key) && key !== except)
        __defProp(to, key, { get: () => from[key], enumerable: !(desc = __getOwnPropDesc(from, key)) || desc.enumerable });
  }
  return to;
};
var __toCommonJS = (mod) => __copyProps(__defProp({}, "__esModule", { value: true }), mod);

// ../pkg/wasm.js
var wasm_exports = {};
__export(wasm_exports, {
  Action: () => Action,
  ActionPointEssentials: () => ActionPointEssentials,
  ActionType: () => ActionType,
  Awake: () => Awake,
  AwakeTrigger: () => AwakeTrigger,
  BattleStatistics: () => BattleStatistics,
  Card: () => Card,
  CardCategory: () => CardCategory,
  CardName: () => CardName,
  CardRuntime: () => CardRuntime,
  CardSelection: () => CardSelection,
  CardSelectionSource: () => CardSelectionSource,
  CardTags: () => CardTags,
  CardTarget: () => CardTarget,
  Context: () => Context,
  DobStatistics: () => DobStatistics,
  Effect: () => Effect,
  EffectName: () => EffectName,
  EffectRuntime: () => EffectRuntime,
  Enemy: () => Enemy,
  EnemyLevel: () => EnemyLevel,
  EnemyName: () => EnemyName,
  EnemyRuntime: () => EnemyRuntime,
  GameGlobal: () => GameGlobal,
  GameStatistics: () => GameStatistics,
  Log: () => Log,
  LogName: () => LogName,
  LootCard: () => LootCard,
  Player: () => Player,
  PlayerLevel: () => PlayerLevel,
  PlayerLevelEssentials: () => PlayerLevelEssentials,
  PlayerRuntime: () => PlayerRuntime,
  PveBattleRuntime: () => PveBattleRuntime,
  PveRuntime: () => PveRuntime,
  PveSession: () => PveSession,
  PveSessionCollection: () => PveSessionCollection,
  PveSessionMaterials: () => PveSessionMaterials,
  PveSystemRuntime: () => PveSystemRuntime,
  RuntimeType: () => RuntimeType,
  RuntimeUnion: () => RuntimeUnion,
  Script: () => Script,
  default: () => wasm_default,
  getActionPointEssentials: () => getActionPointEssentials,
  getCardByDna: () => getCardByDna,
  getDefaultDnaCollection: () => getDefaultDnaCollection,
  getPlayerLevelEssentials: () => getPlayerLevelEssentials,
  initSync: () => initSync
});
module.exports = __toCommonJS(wasm_exports);
var wasm;
var heap = new Array(128).fill(void 0);
heap.push(void 0, null, true, false);
function getObject(idx) {
  return heap[idx];
}
var WASM_VECTOR_LEN = 0;
var cachedUint8ArrayMemory0 = null;
function getUint8ArrayMemory0() {
  if (cachedUint8ArrayMemory0 === null || cachedUint8ArrayMemory0.byteLength === 0) {
    cachedUint8ArrayMemory0 = new Uint8Array(wasm.memory.buffer);
  }
  return cachedUint8ArrayMemory0;
}
var cachedTextEncoder = typeof TextEncoder !== "undefined" ? new TextEncoder("utf-8") : { encode: () => {
  throw Error("TextEncoder not available");
} };
var encodeString = typeof cachedTextEncoder.encodeInto === "function" ? function(arg, view) {
  return cachedTextEncoder.encodeInto(arg, view);
} : function(arg, view) {
  const buf = cachedTextEncoder.encode(arg);
  view.set(buf);
  return {
    read: arg.length,
    written: buf.length
  };
};
function passStringToWasm0(arg, malloc, realloc) {
  if (realloc === void 0) {
    const buf = cachedTextEncoder.encode(arg);
    const ptr2 = malloc(buf.length, 1) >>> 0;
    getUint8ArrayMemory0().subarray(ptr2, ptr2 + buf.length).set(buf);
    WASM_VECTOR_LEN = buf.length;
    return ptr2;
  }
  let len = arg.length;
  let ptr = malloc(len, 1) >>> 0;
  const mem = getUint8ArrayMemory0();
  let offset = 0;
  for (; offset < len; offset++) {
    const code = arg.charCodeAt(offset);
    if (code > 127) break;
    mem[ptr + offset] = code;
  }
  if (offset !== len) {
    if (offset !== 0) {
      arg = arg.slice(offset);
    }
    ptr = realloc(ptr, len, len = offset + arg.length * 3, 1) >>> 0;
    const view = getUint8ArrayMemory0().subarray(ptr + offset, ptr + len);
    const ret = encodeString(arg, view);
    offset += ret.written;
    ptr = realloc(ptr, len, offset, 1) >>> 0;
  }
  WASM_VECTOR_LEN = offset;
  return ptr;
}
var cachedDataViewMemory0 = null;
function getDataViewMemory0() {
  if (cachedDataViewMemory0 === null || cachedDataViewMemory0.buffer.detached === true || cachedDataViewMemory0.buffer.detached === void 0 && cachedDataViewMemory0.buffer !== wasm.memory.buffer) {
    cachedDataViewMemory0 = new DataView(wasm.memory.buffer);
  }
  return cachedDataViewMemory0;
}
var heap_next = heap.length;
function addHeapObject(obj) {
  if (heap_next === heap.length) heap.push(heap.length + 1);
  const idx = heap_next;
  heap_next = heap[idx];
  heap[idx] = obj;
  return idx;
}
var cachedTextDecoder = typeof TextDecoder !== "undefined" ? new TextDecoder("utf-8", { ignoreBOM: true, fatal: true }) : { decode: () => {
  throw Error("TextDecoder not available");
} };
if (typeof TextDecoder !== "undefined") {
  cachedTextDecoder.decode();
}
function getStringFromWasm0(ptr, len) {
  ptr = ptr >>> 0;
  return cachedTextDecoder.decode(getUint8ArrayMemory0().subarray(ptr, ptr + len));
}
function handleError(f, args) {
  try {
    return f.apply(this, args);
  } catch (e) {
    wasm.__wbindgen_export_2(addHeapObject(e));
  }
}
function dropObject(idx) {
  if (idx < 132) return;
  heap[idx] = heap_next;
  heap_next = idx;
}
function takeObject(idx) {
  const ret = getObject(idx);
  dropObject(idx);
  return ret;
}
function isLikeNone(x) {
  return x === void 0 || x === null;
}
var CLOSURE_DTORS = typeof FinalizationRegistry === "undefined" ? { register: () => {
}, unregister: () => {
} } : new FinalizationRegistry((state) => {
  wasm.__wbindgen_export_3.get(state.dtor)(state.a, state.b);
});
function makeMutClosure(arg0, arg1, dtor, f) {
  const state = { a: arg0, b: arg1, cnt: 1, dtor };
  const real = (...args) => {
    state.cnt++;
    const a = state.a;
    state.a = 0;
    try {
      return f(a, state.b, ...args);
    } finally {
      if (--state.cnt === 0) {
        wasm.__wbindgen_export_3.get(state.dtor)(a, state.b);
        CLOSURE_DTORS.unregister(state);
      } else {
        state.a = a;
      }
    }
  };
  real.original = state;
  CLOSURE_DTORS.register(real, state, state);
  return real;
}
function debugString(val) {
  const type = typeof val;
  if (type == "number" || type == "boolean" || val == null) {
    return `${val}`;
  }
  if (type == "string") {
    return `"${val}"`;
  }
  if (type == "symbol") {
    const description = val.description;
    if (description == null) {
      return "Symbol";
    } else {
      return `Symbol(${description})`;
    }
  }
  if (type == "function") {
    const name = val.name;
    if (typeof name == "string" && name.length > 0) {
      return `Function(${name})`;
    } else {
      return "Function";
    }
  }
  if (Array.isArray(val)) {
    const length = val.length;
    let debug = "[";
    if (length > 0) {
      debug += debugString(val[0]);
    }
    for (let i = 1; i < length; i++) {
      debug += ", " + debugString(val[i]);
    }
    debug += "]";
    return debug;
  }
  const builtInMatches = /\[object ([^\]]+)\]/.exec(toString.call(val));
  let className;
  if (builtInMatches && builtInMatches.length > 1) {
    className = builtInMatches[1];
  } else {
    return toString.call(val);
  }
  if (className == "Object") {
    try {
      return "Object(" + JSON.stringify(val) + ")";
    } catch (_) {
      return "Object";
    }
  }
  if (val instanceof Error) {
    return `${val.name}: ${val.message}
${val.stack}`;
  }
  return className;
}
function passArray8ToWasm0(arg, malloc) {
  const ptr = malloc(arg.length * 1, 1) >>> 0;
  getUint8ArrayMemory0().set(arg, ptr / 1);
  WASM_VECTOR_LEN = arg.length;
  return ptr;
}
function passArrayJsValueToWasm0(array, malloc) {
  const ptr = malloc(array.length * 4, 4) >>> 0;
  const mem = getDataViewMemory0();
  for (let i = 0; i < array.length; i++) {
    mem.setUint32(ptr + 4 * i, addHeapObject(array[i]), true);
  }
  WASM_VECTOR_LEN = array.length;
  return ptr;
}
function getArrayJsValueFromWasm0(ptr, len) {
  ptr = ptr >>> 0;
  const mem = getDataViewMemory0();
  const result = [];
  for (let i = ptr; i < ptr + 4 * len; i += 4) {
    result.push(takeObject(mem.getUint32(i, true)));
  }
  return result;
}
var cachedUint16ArrayMemory0 = null;
function getUint16ArrayMemory0() {
  if (cachedUint16ArrayMemory0 === null || cachedUint16ArrayMemory0.byteLength === 0) {
    cachedUint16ArrayMemory0 = new Uint16Array(wasm.memory.buffer);
  }
  return cachedUint16ArrayMemory0;
}
function passArray16ToWasm0(arg, malloc) {
  const ptr = malloc(arg.length * 2, 2) >>> 0;
  getUint16ArrayMemory0().set(arg, ptr / 2);
  WASM_VECTOR_LEN = arg.length;
  return ptr;
}
function getCardByDna(dna) {
  try {
    const retptr = wasm.__wbindgen_add_to_stack_pointer(-16);
    const ptr0 = passArray8ToWasm0(dna, wasm.__wbindgen_export_0);
    const len0 = WASM_VECTOR_LEN;
    wasm.getCardByDna(retptr, ptr0, len0);
    var r0 = getDataViewMemory0().getInt32(retptr + 4 * 0, true);
    var r1 = getDataViewMemory0().getInt32(retptr + 4 * 1, true);
    var r2 = getDataViewMemory0().getInt32(retptr + 4 * 2, true);
    if (r2) {
      throw takeObject(r1);
    }
    return Card.__wrap(r0);
  } finally {
    wasm.__wbindgen_add_to_stack_pointer(16);
  }
}
function getDefaultDnaCollection() {
  try {
    const retptr = wasm.__wbindgen_add_to_stack_pointer(-16);
    wasm.getDefaultDnaCollection(retptr);
    var r0 = getDataViewMemory0().getInt32(retptr + 4 * 0, true);
    var r1 = getDataViewMemory0().getInt32(retptr + 4 * 1, true);
    var r2 = getDataViewMemory0().getInt32(retptr + 4 * 2, true);
    var r3 = getDataViewMemory0().getInt32(retptr + 4 * 3, true);
    if (r3) {
      throw takeObject(r2);
    }
    var v1 = getArrayJsValueFromWasm0(r0, r1).slice();
    wasm.__wbindgen_export_4(r0, r1 * 4, 4);
    return v1;
  } finally {
    wasm.__wbindgen_add_to_stack_pointer(16);
  }
}
function getActionPointEssentials() {
  const ret = wasm.getActionPointEssentials();
  return ActionPointEssentials.__wrap(ret);
}
function getPlayerLevelEssentials(level) {
  const ret = wasm.getPlayerLevelEssentials(level);
  return ret === 0 ? void 0 : PlayerLevelEssentials.__wrap(ret);
}
function _assertClass(instance, klass) {
  if (!(instance instanceof klass)) {
    throw new Error(`expected instance of ${klass.name}`);
  }
}
function getArrayU16FromWasm0(ptr, len) {
  ptr = ptr >>> 0;
  return getUint16ArrayMemory0().subarray(ptr / 2, ptr / 2 + len);
}
function getArrayU8FromWasm0(ptr, len) {
  ptr = ptr >>> 0;
  return getUint8ArrayMemory0().subarray(ptr / 1, ptr / 1 + len);
}
function __wbg_adapter_50(arg0, arg1, arg2) {
  wasm.__wbindgen_export_5(arg0, arg1, addHeapObject(arg2));
}
function __wbg_adapter_470(arg0, arg1, arg2, arg3) {
  wasm.__wbindgen_export_6(arg0, arg1, addHeapObject(arg2), addHeapObject(arg3));
}
var ActionType = Object.freeze({
  UseStrike: 0,
  "0": "UseStrike",
  UseMultipleStrike: 1,
  "1": "UseMultipleStrike",
  UseBlock: 2,
  "2": "UseBlock",
  UseShield: 3,
  "3": "UseShield",
  UseHeal: 4,
  "4": "UseHeal",
  UseEffect: 5,
  "5": "UseEffect",
  SummonCreature: 6,
  "6": "SummonCreature",
  SummonCreatureByName: 7,
  "7": "SummonCreatureByName",
  AddEnemyAttack: 8,
  "8": "AddEnemyAttack",
  AddEnemyDefense: 9,
  "9": "AddEnemyDefense",
  AddEnemySpirit: 10,
  "10": "AddEnemySpirit",
  AddEnemyEffect: 11,
  "11": "AddEnemyEffect"
});
var AwakeTrigger = Object.freeze({
  Cost: 0,
  "0": "Cost",
  Damage: 1,
  "1": "Damage",
  Hurt: 2,
  "2": "Hurt",
  Round: 3,
  "3": "Round"
});
var CardCategory = Object.freeze({
  Strike: 0,
  "0": "Strike",
  Block: 1,
  "1": "Block",
  Shield: 2,
  "2": "Shield",
  Heal: 3,
  "3": "Heal",
  Trick: 4,
  "4": "Trick",
  Trap: 5,
  "5": "Trap",
  Sorcery: 6,
  "6": "Sorcery",
  Equipment: 7,
  "7": "Equipment"
});
var CardName = Object.freeze({
  PizzaDay: 0,
  "0": "PizzaDay",
  ScaleArmor: 1,
  "1": "ScaleArmor",
  JackKnife: 2,
  "2": "JackKnife",
  GoldenHoop: 3,
  "3": "GoldenHoop",
  GoldenArmor: 4,
  "4": "GoldenArmor",
  SparkShield: 5,
  "5": "SparkShield",
  HolyGrail: 6,
  "6": "HolyGrail",
  WeirdMask: 7,
  "7": "WeirdMask",
  GinsengGrass: 8,
  "8": "GinsengGrass",
  RubbyHammer: 9,
  "9": "RubbyHammer",
  RedFan: 10,
  "10": "RedFan",
  Mushroom: 11,
  "11": "Mushroom",
  SkullBall: 12,
  "12": "SkullBall",
  HeavyCrown: 13,
  "13": "HeavyCrown",
  Sunflower: 14,
  "14": "Sunflower",
  SilverBullets: 15,
  "15": "SilverBullets",
  Shuriken: 16,
  "16": "Shuriken",
  BlackRose: 17,
  "17": "BlackRose",
  ArcaneBurst: 18,
  "18": "ArcaneBurst",
  InfernoBolt: 19,
  "19": "InfernoBolt",
  SolarSurge: 20,
  "20": "SolarSurge",
  Rampage: 21,
  "21": "Rampage",
  SorceryEcho: 22,
  "22": "SorceryEcho",
  ManaBlast: 23,
  "23": "ManaBlast",
  Dome: 24,
  "24": "Dome",
  BloodyFeast: 25,
  "25": "BloodyFeast",
  Revenge: 26,
  "26": "Revenge",
  BloodSurge: 27,
  "27": "BloodSurge",
  CostUnlock: 28,
  "28": "CostUnlock",
  ComboAssault: 29,
  "29": "ComboAssault",
  Again: 30,
  "30": "Again",
  MuscleFirm: 31,
  "31": "MuscleFirm",
  Ceremony: 32,
  "32": "Ceremony",
  Strike: 33,
  "33": "Strike",
  Cleave: 34,
  "34": "Cleave",
  MortalStrike: 35,
  "35": "MortalStrike",
  QuickShot: 36,
  "36": "QuickShot",
  ChargeStrike: 37,
  "37": "ChargeStrike",
  Pierce: 38,
  "38": "Pierce",
  Degauss: 39,
  "39": "Degauss",
  DivineStrike: 40,
  "40": "DivineStrike",
  SlientRoar: 41,
  "41": "SlientRoar",
  QuietRaid: 42,
  "42": "QuietRaid",
  Bloodthirsty: 43,
  "43": "Bloodthirsty",
  Retaliate: 44,
  "44": "Retaliate",
  SoulBurn: 45,
  "45": "SoulBurn",
  Frenzy: 46,
  "46": "Frenzy",
  RedFlash: 47,
  "47": "RedFlash",
  Ambush: 48,
  "48": "Ambush",
  DeadlySting: 49,
  "49": "DeadlySting",
  ArmorBreak: 50,
  "50": "ArmorBreak",
  CrushingBlow: 51,
  "51": "CrushingBlow",
  Corrupt: 52,
  "52": "Corrupt",
  ArmorGlitch: 53,
  "53": "ArmorGlitch",
  BlockOverflow: 54,
  "54": "BlockOverflow",
  SteelStrike: 55,
  "55": "SteelStrike",
  LifeDrain: 56,
  "56": "LifeDrain",
  GroundShatter: 57,
  "57": "GroundShatter",
  DeathBeam: 58,
  "58": "DeathBeam",
  Linkage: 59,
  "59": "Linkage",
  CounterStrike: 60,
  "60": "CounterStrike",
  Necromancy: 61,
  "61": "Necromancy",
  Overwhelm: 62,
  "62": "Overwhelm",
  GravePortal: 63,
  "63": "GravePortal",
  Sacrifice: 64,
  "64": "Sacrifice",
  Madness: 65,
  "65": "Madness",
  PowerUnleash: 66,
  "66": "PowerUnleash",
  StrikePenaty: 67,
  "67": "StrikePenaty",
  EvilExile: 68,
  "68": "EvilExile",
  Imprison: 69,
  "69": "Imprison",
  WorkOut: 70,
  "70": "WorkOut",
  SpiritBash: 71,
  "71": "SpiritBash",
  CoreCollapse: 72,
  "72": "CoreCollapse",
  Block: 73,
  "73": "Block",
  Overclocking: 74,
  "74": "Overclocking",
  IronWall: 75,
  "75": "IronWall",
  CasualTraining: 76,
  "76": "CasualTraining",
  EmergencyBarrier: 77,
  "77": "EmergencyBarrier",
  Rampart: 78,
  "78": "Rampart",
  BlockDeadlock: 79,
  "79": "BlockDeadlock",
  BlockReflection: 80,
  "80": "BlockReflection",
  ComboGuard: 81,
  "81": "ComboGuard",
  ThronCrown: 82,
  "82": "ThronCrown",
  Vigilance: 83,
  "83": "Vigilance",
  BlockCycle: 84,
  "84": "BlockCycle",
  CounterGuard: 85,
  "85": "CounterGuard",
  ResonantBarrier: 86,
  "86": "ResonantBarrier",
  BlockFold: 87,
  "87": "BlockFold",
  Heal: 88,
  "88": "Heal",
  MysticPotion: 89,
  "89": "MysticPotion",
  LifeSurge: 90,
  "90": "LifeSurge",
  QuickDrink: 91,
  "91": "QuickDrink",
  HealingTouch: 92,
  "92": "HealingTouch",
  DeadlyHeal: 93,
  "93": "DeadlyHeal",
  GreenWard: 94,
  "94": "GreenWard",
  Cleanse: 95,
  "95": "Cleanse",
  MagneticHeal: 96,
  "96": "MagneticHeal",
  MagicalDraw: 97,
  "97": "MagicalDraw",
  Overeating: 98,
  "98": "Overeating",
  SoulSalve: 99,
  "99": "SoulSalve",
  ChargeVitality: 100,
  "100": "ChargeVitality",
  VoidEcho: 101,
  "101": "VoidEcho",
  Shield: 102,
  "102": "Shield",
  BurstShelter: 103,
  "103": "BurstShelter",
  GaintCover: 104,
  "104": "GaintCover",
  MedicalShell: 105,
  "105": "MedicalShell",
  DrainField: 106,
  "106": "DrainField",
  StackBarrier: 107,
  "107": "StackBarrier",
  MoraleShake: 108,
  "108": "MoraleShake",
  UnstableAegis: 109,
  "109": "UnstableAegis",
  CrimsonMoon: 110,
  "110": "CrimsonMoon",
  MentalFocus: 111,
  "111": "MentalFocus",
  AgeisUpkeep: 112,
  "112": "AgeisUpkeep",
  SpiritBurst: 113,
  "113": "SpiritBurst",
  MassAttack: 114,
  "114": "MassAttack",
  ShellSwap: 115,
  "115": "ShellSwap",
  BlockAmplify: 116,
  "116": "BlockAmplify",
  PurgeAll: 117,
  "117": "PurgeAll",
  VampiricTouch: 118,
  "118": "VampiricTouch",
  GraveRebirth: 119,
  "119": "GraveRebirth",
  Enlighten: 120,
  "120": "Enlighten",
  OpenEye: 121,
  "121": "OpenEye",
  TrashRecycle: 122,
  "122": "TrashRecycle",
  DarkLutos: 123,
  "123": "DarkLutos",
  SoulRecall: 124,
  "124": "SoulRecall",
  Seek: 125,
  "125": "Seek",
  Renewal: 126,
  "126": "Renewal",
  Venom: 127,
  "127": "Venom",
  TimeShift: 128,
  "128": "TimeShift",
  LeakDelay: 129,
  "129": "LeakDelay",
  LifePrice: 130,
  "130": "LifePrice",
  CostUnstable: 131,
  "131": "CostUnstable",
  PowerSurge: 132,
  "132": "PowerSurge",
  EnergeFlow: 133,
  "133": "EnergeFlow",
  JungleLaw: 134,
  "134": "JungleLaw",
  Bother: 135,
  "135": "Bother",
  WillConfuse: 136,
  "136": "WillConfuse",
  Dispirit: 137,
  "137": "Dispirit",
  MeritChase: 138,
  "138": "MeritChase",
  PowerShift: 139,
  "139": "PowerShift",
  ExileFury: 140,
  "140": "ExileFury",
  WildCard: 141,
  "141": "WildCard",
  LifeFeast: 142,
  "142": "LifeFeast",
  NiceChoice: 143,
  "143": "NiceChoice",
  TwinsFusion: 144,
  "144": "TwinsFusion",
  Pain: 145,
  "145": "Pain",
  Vanguard: 146,
  "146": "Vanguard",
  Purify: 147,
  "147": "Purify",
  PerfectCopy: 148,
  "148": "PerfectCopy",
  Void: 149,
  "149": "Void",
  Overreaction: 150,
  "150": "Overreaction",
  BlockLock: 151,
  "151": "BlockLock",
  Disturb: 152,
  "152": "Disturb",
  HealLock: 153,
  "153": "HealLock",
  ToxicGem: 154,
  "154": "ToxicGem",
  ShieldLock: 155,
  "155": "ShieldLock",
  MagicSteal: 156,
  "156": "MagicSteal",
  DeathPenalty: 157,
  "157": "DeathPenalty",
  DirtyShield: 158,
  "158": "DirtyShield"
});
var CardSelectionSource = Object.freeze({
  NoSelection: 0,
  "0": "NoSelection",
  Deck: 1,
  "1": "Deck",
  Loot: 2,
  "2": "Loot",
  Grave: 3,
  "3": "Grave",
  Exile: 4,
  "4": "Exile",
  Hand: 5,
  "5": "Hand"
});
var CardTags = Object.freeze({
  Exile: 0,
  "0": "Exile",
  Block: 1,
  "1": "Block",
  Shield: 2,
  "2": "Shield",
  Attack: 3,
  "3": "Attack",
  Defense: 4,
  "4": "Defense",
  Spirit: 5,
  "5": "Spirit",
  Energy: 6,
  "6": "Energy",
  Effect: 7,
  "7": "Effect",
  Intention: 8,
  "8": "Intention",
  X: 9,
  "9": "X",
  Ability: 10,
  "10": "Ability",
  Unbreakable: 11,
  "11": "Unbreakable",
  Cure: 12,
  "12": "Cure",
  LifeCover: 13,
  "13": "LifeCover",
  Powerlessness: 14,
  "14": "Powerlessness",
  Poison: 15,
  "15": "Poison",
  Bleed: 16,
  "16": "Bleed",
  Weakness: 17,
  "17": "Weakness",
  BloodMania: 18,
  "18": "BloodMania",
  Feedback: 19,
  "19": "Feedback",
  StrikeCard: 20,
  "20": "StrikeCard",
  BlockCard: 21,
  "21": "BlockCard",
  ShieldCard: 22,
  "22": "ShieldCard",
  HealCard: 23,
  "23": "HealCard",
  TrickCard: 24,
  "24": "TrickCard",
  TrapCard: 25,
  "25": "TrapCard",
  SorceryCard: 26,
  "26": "SorceryCard",
  EquipmentCard: 27,
  "27": "EquipmentCard",
  CostAwake: 28,
  "28": "CostAwake",
  DamageAwake: 29,
  "29": "DamageAwake",
  HurtAwake: 30,
  "30": "HurtAwake",
  RoundAwake: 31,
  "31": "RoundAwake"
});
var CardTarget = Object.freeze({
  Player: 0,
  "0": "Player",
  Enemy: 1,
  "1": "Enemy",
  Entity: 2,
  "2": "Entity",
  RandomEnemy: 3,
  "3": "RandomEnemy",
  AllEnemies: 4,
  "4": "AllEnemies",
  AllEntities: 5,
  "5": "AllEntities"
});
var EffectName = Object.freeze({
  Feedback: 0,
  "0": "Feedback",
  DamageSurge: 1,
  "1": "DamageSurge",
  Powerlessness: 2,
  "2": "Powerlessness",
  TargetDiffusion: 3,
  "3": "TargetDiffusion",
  MuscleEcho: 4,
  "4": "MuscleEcho",
  DamageImmunity: 5,
  "5": "DamageImmunity",
  Vampire: 6,
  "6": "Vampire",
  PainConversion: 7,
  "7": "PainConversion",
  PainfulDraw: 8,
  "8": "PainfulDraw",
  BlockDisable: 9,
  "9": "BlockDisable",
  BlockDenial: 10,
  "10": "BlockDenial",
  ShieldDenial: 11,
  "11": "ShieldDenial",
  ShieldDowngrade: 12,
  "12": "ShieldDowngrade",
  Weakness: 13,
  "13": "Weakness",
  BlockUpgrade: 14,
  "14": "BlockUpgrade",
  BlockMirror: 15,
  "15": "BlockMirror",
  BlockDelay: 16,
  "16": "BlockDelay",
  Unbreakable: 17,
  "17": "Unbreakable",
  MuscleToxin: 18,
  "18": "MuscleToxin",
  SpiritCallback: 19,
  "19": "SpiritCallback",
  SpiritForge: 20,
  "20": "SpiritForge",
  ToxicShield: 21,
  "21": "ToxicShield",
  LifeCover: 22,
  "22": "LifeCover",
  Cure: 23,
  "23": "Cure",
  Bleed: 24,
  "24": "Bleed",
  HealDenial: 25,
  "25": "HealDenial",
  ToxicHeal: 26,
  "26": "ToxicHeal",
  HealEcho: 27,
  "27": "HealEcho",
  Poison: 28,
  "28": "Poison",
  BloodMania: 29,
  "29": "BloodMania",
  JungleLaw: 30,
  "30": "JungleLaw",
  BuffTheif: 31,
  "31": "BuffTheif",
  LastGasp: 32,
  "32": "LastGasp",
  DirtyDeath: 33,
  "33": "DirtyDeath",
  EnergyLeak: 34,
  "34": "EnergyLeak",
  EnergyExpansion: 35,
  "35": "EnergyExpansion"
});
var EnemyLevel = Object.freeze({
  Easy: 0,
  "0": "Easy",
  Normal: 1,
  "1": "Normal",
  Hard: 2,
  "2": "Hard"
});
var EnemyName = Object.freeze({
  Goblin: 0,
  "0": "Goblin",
  Jellybean: 1,
  "1": "Jellybean",
  Fly: 2,
  "2": "Fly",
  Shrimp: 3,
  "3": "Shrimp",
  TreeMan: 4,
  "4": "TreeMan",
  Snake: 5,
  "5": "Snake",
  Wolfman: 6,
  "6": "Wolfman",
  Doom: 7,
  "7": "Doom",
  DragonGirl: 8,
  "8": "DragonGirl",
  Medusa: 9,
  "9": "Medusa",
  Witch: 10,
  "10": "Witch"
});
var LogName = Object.freeze({
  InitPlayer: 0,
  "0": "InitPlayer",
  BattleOver: 1,
  "1": "BattleOver",
  GameOver: 2,
  "2": "GameOver",
  EnterBattle: 3,
  "3": "EnterBattle",
  NextRound: 4,
  "4": "NextRound",
  PlayerTurn: 5,
  "5": "PlayerTurn",
  EnemyTurn: 6,
  "6": "EnemyTurn",
  AddEnemy: 7,
  "7": "AddEnemy",
  RemoveEnemy: 8,
  "8": "RemoveEnemy",
  Attack: 9,
  "9": "Attack",
  Hit: 10,
  "10": "Hit",
  HpChange: 11,
  "11": "HpChange",
  MaxHpChange: 12,
  "12": "MaxHpChange",
  AttackChange: 13,
  "13": "AttackChange",
  DefenseChange: 14,
  "14": "DefenseChange",
  SpiritChange: 15,
  "15": "SpiritChange",
  BlockChange: 16,
  "16": "BlockChange",
  BlockReset: 17,
  "17": "BlockReset",
  ShieldChange: 18,
  "18": "ShieldChange",
  BuffPointChange: 19,
  "19": "BuffPointChange",
  EnergyChange: 20,
  "20": "EnergyChange",
  EnergyMaxChange: 21,
  "21": "EnergyMaxChange",
  CardCostChange: 22,
  "22": "CardCostChange",
  CardTargetChange: 23,
  "23": "CardTargetChange",
  CardAwakeChange: 24,
  "24": "CardAwakeChange",
  CardExileChange: 25,
  "25": "CardExileChange",
  AddBuff: 26,
  "26": "AddBuff",
  RemoveBuff: 27,
  "27": "RemoveBuff",
  BuffApplied: 28,
  "28": "BuffApplied",
  EquipmentApplied: 29,
  "29": "EquipmentApplied",
  AddCard: 30,
  "30": "AddCard",
  CardMoveDeckToHand: 31,
  "31": "CardMoveDeckToHand",
  CardMoveHandToGrave: 32,
  "32": "CardMoveHandToGrave",
  CardMoveHandToExile: 33,
  "33": "CardMoveHandToExile",
  CardMoveDeckToExile: 34,
  "34": "CardMoveDeckToExile",
  CardMoveGraveToHand: 35,
  "35": "CardMoveGraveToHand",
  CardMoveExileToGrave: 36,
  "36": "CardMoveExileToGrave",
  CardMoveGraveToExile: 37,
  "37": "CardMoveGraveToExile",
  CardRemove: 38,
  "38": "CardRemove",
  DeckReset: 39,
  "39": "DeckReset",
  GraveReset: 40,
  "40": "GraveReset",
  LootGold: 41,
  "41": "LootGold",
  FillActions: 42,
  "42": "FillActions",
  TakeAction: 43,
  "43": "TakeAction",
  ClearActions: 44,
  "44": "ClearActions",
  SelectCards: 45,
  "45": "SelectCards",
  ActionPointChange: 46,
  "46": "ActionPointChange"
});
var PlayerLevel = Object.freeze({
  LevelPvp: 0,
  "0": "LevelPvp",
  LevelPveElementary: 1,
  "1": "LevelPveElementary",
  LevelPveIntermediate: 2,
  "2": "LevelPveIntermediate",
  LevelPveAdvanced: 3,
  "3": "LevelPveAdvanced"
});
var RuntimeType = Object.freeze({
  Card: 0,
  "0": "Card",
  Enemy: 1,
  "1": "Enemy",
  Player: 2,
  "2": "Player",
  Effect: 3,
  "3": "Effect",
  PveBattle: 4,
  "4": "PveBattle",
  PveSystem: 5,
  "5": "PveSystem",
  Unknown: 6,
  "6": "Unknown"
});
var __wbindgen_enum_RequestCredentials = ["omit", "same-origin", "include"];
var __wbindgen_enum_RequestMode = ["same-origin", "no-cors", "cors", "navigate"];
var ActionFinalization = typeof FinalizationRegistry === "undefined" ? { register: () => {
}, unregister: () => {
} } : new FinalizationRegistry((ptr) => wasm.__wbg_action_free(ptr >>> 0, 1));
var Action = class _Action {
  static __wrap(ptr) {
    ptr = ptr >>> 0;
    const obj = Object.create(_Action.prototype);
    obj.__wbg_ptr = ptr;
    ActionFinalization.register(obj, obj.__wbg_ptr, obj);
    return obj;
  }
  __destroy_into_raw() {
    const ptr = this.__wbg_ptr;
    this.__wbg_ptr = 0;
    ActionFinalization.unregister(this);
    return ptr;
  }
  free() {
    const ptr = this.__destroy_into_raw();
    wasm.__wbg_action_free(ptr, 0);
  }
  /**
   * @returns {ActionType}
   */
  get actionType() {
    const ret = wasm.__wbg_get_action_actionType(this.__wbg_ptr);
    return ret;
  }
  /**
   * @param {ActionType} arg0
   */
  set actionType(arg0) {
    wasm.__wbg_set_action_actionType(this.__wbg_ptr, arg0);
  }
  /**
   * @returns {number | undefined}
   */
  get value() {
    const ret = wasm.__wbg_get_action_value(this.__wbg_ptr);
    return ret === 16777215 ? void 0 : ret;
  }
  /**
   * @param {number | undefined} [arg0]
   */
  set value(arg0) {
    wasm.__wbg_set_action_value(this.__wbg_ptr, isLikeNone(arg0) ? 16777215 : arg0);
  }
  /**
   * @returns {number | undefined}
   */
  get count() {
    const ret = wasm.__wbg_get_action_count(this.__wbg_ptr);
    return ret === 16777215 ? void 0 : ret;
  }
  /**
   * @param {number | undefined} [arg0]
   */
  set count(arg0) {
    wasm.__wbg_set_action_count(this.__wbg_ptr, isLikeNone(arg0) ? 16777215 : arg0);
  }
  /**
   * @returns {Effect | undefined}
   */
  get effect() {
    const ret = wasm.__wbg_get_action_effect(this.__wbg_ptr);
    return ret === 0 ? void 0 : Effect.__wrap(ret);
  }
  /**
   * @param {Effect | undefined} [arg0]
   */
  set effect(arg0) {
    let ptr0 = 0;
    if (!isLikeNone(arg0)) {
      _assertClass(arg0, Effect);
      ptr0 = arg0.__destroy_into_raw();
    }
    wasm.__wbg_set_action_effect(this.__wbg_ptr, ptr0);
  }
  /**
   * @returns {EnemyLevel | undefined}
   */
  get enemyLevel() {
    const ret = wasm.__wbg_get_action_enemyLevel(this.__wbg_ptr);
    return ret === 3 ? void 0 : ret;
  }
  /**
   * @param {EnemyLevel | undefined} [arg0]
   */
  set enemyLevel(arg0) {
    wasm.__wbg_set_action_enemyLevel(this.__wbg_ptr, isLikeNone(arg0) ? 3 : arg0);
  }
  /**
   * @returns {EnemyName | undefined}
   */
  get enemyName() {
    const ret = wasm.__wbg_get_action_enemyName(this.__wbg_ptr);
    return ret === 11 ? void 0 : ret;
  }
  /**
   * @param {EnemyName | undefined} [arg0]
   */
  set enemyName(arg0) {
    wasm.__wbg_set_action_enemyName(this.__wbg_ptr, isLikeNone(arg0) ? 11 : arg0);
  }
  /**
   * @returns {number}
   */
  get version() {
    const ret = wasm.__wbg_get_action_version(this.__wbg_ptr);
    return ret;
  }
  /**
   * @param {number} arg0
   */
  set version(arg0) {
    wasm.__wbg_set_action_version(this.__wbg_ptr, arg0);
  }
};
var ActionPointEssentialsFinalization = typeof FinalizationRegistry === "undefined" ? { register: () => {
}, unregister: () => {
} } : new FinalizationRegistry((ptr) => wasm.__wbg_actionpointessentials_free(ptr >>> 0, 1));
var ActionPointEssentials = class _ActionPointEssentials {
  static __wrap(ptr) {
    ptr = ptr >>> 0;
    const obj = Object.create(_ActionPointEssentials.prototype);
    obj.__wbg_ptr = ptr;
    ActionPointEssentialsFinalization.register(obj, obj.__wbg_ptr, obj);
    return obj;
  }
  __destroy_into_raw() {
    const ptr = this.__wbg_ptr;
    this.__wbg_ptr = 0;
    ActionPointEssentialsFinalization.unregister(this);
    return ptr;
  }
  free() {
    const ptr = this.__destroy_into_raw();
    wasm.__wbg_actionpointessentials_free(ptr, 0);
  }
  /**
   * @returns {number}
   */
  get maxActionPoint() {
    const ret = wasm.__wbg_get_actionpointessentials_maxActionPoint(this.__wbg_ptr);
    return ret;
  }
  /**
   * @param {number} arg0
   */
  set maxActionPoint(arg0) {
    wasm.__wbg_set_actionpointessentials_maxActionPoint(this.__wbg_ptr, arg0);
  }
  /**
   * @returns {number}
   */
  get blockPerActionPoint() {
    const ret = wasm.__wbg_get_actionpointessentials_blockPerActionPoint(this.__wbg_ptr);
    return ret;
  }
  /**
   * @param {number} arg0
   */
  set blockPerActionPoint(arg0) {
    wasm.__wbg_set_actionpointessentials_blockPerActionPoint(this.__wbg_ptr, arg0);
  }
  /**
   * @returns {number}
   */
  get ckbPerActionPoint() {
    const ret = wasm.__wbg_get_actionpointessentials_ckbPerActionPoint(this.__wbg_ptr);
    return ret;
  }
  /**
   * @param {number} arg0
   */
  set ckbPerActionPoint(arg0) {
    wasm.__wbg_set_actionpointessentials_ckbPerActionPoint(this.__wbg_ptr, arg0);
  }
};
var AwakeFinalization = typeof FinalizationRegistry === "undefined" ? { register: () => {
}, unregister: () => {
} } : new FinalizationRegistry((ptr) => wasm.__wbg_awake_free(ptr >>> 0, 1));
var Awake = class _Awake {
  static __wrap(ptr) {
    ptr = ptr >>> 0;
    const obj = Object.create(_Awake.prototype);
    obj.__wbg_ptr = ptr;
    AwakeFinalization.register(obj, obj.__wbg_ptr, obj);
    return obj;
  }
  __destroy_into_raw() {
    const ptr = this.__wbg_ptr;
    this.__wbg_ptr = 0;
    AwakeFinalization.unregister(this);
    return ptr;
  }
  free() {
    const ptr = this.__destroy_into_raw();
    wasm.__wbg_awake_free(ptr, 0);
  }
  /**
   * @returns {AwakeTrigger}
   */
  get awakeType() {
    const ret = wasm.__wbg_get_awake_awakeType(this.__wbg_ptr);
    return ret;
  }
  /**
   * @param {AwakeTrigger} arg0
   */
  set awakeType(arg0) {
    wasm.__wbg_set_awake_awakeType(this.__wbg_ptr, arg0);
  }
  /**
   * @returns {number}
   */
  get value() {
    const ret = wasm.__wbg_get_awake_value(this.__wbg_ptr);
    return ret;
  }
  /**
   * @param {number} arg0
   */
  set value(arg0) {
    wasm.__wbg_set_awake_value(this.__wbg_ptr, arg0);
  }
};
var BattleStatisticsFinalization = typeof FinalizationRegistry === "undefined" ? { register: () => {
}, unregister: () => {
} } : new FinalizationRegistry((ptr) => wasm.__wbg_battlestatistics_free(ptr >>> 0, 1));
var BattleStatistics = class _BattleStatistics {
  static __wrap(ptr) {
    ptr = ptr >>> 0;
    const obj = Object.create(_BattleStatistics.prototype);
    obj.__wbg_ptr = ptr;
    BattleStatisticsFinalization.register(obj, obj.__wbg_ptr, obj);
    return obj;
  }
  __destroy_into_raw() {
    const ptr = this.__wbg_ptr;
    this.__wbg_ptr = 0;
    BattleStatisticsFinalization.unregister(this);
    return ptr;
  }
  free() {
    const ptr = this.__destroy_into_raw();
    wasm.__wbg_battlestatistics_free(ptr, 0);
  }
  /**
   * @returns {number}
   */
  get maxCardUsedPerRound() {
    const ret = wasm.__wbg_get_actionpointessentials_maxActionPoint(this.__wbg_ptr);
    return ret;
  }
  /**
   * @param {number} arg0
   */
  set maxCardUsedPerRound(arg0) {
    wasm.__wbg_set_actionpointessentials_maxActionPoint(this.__wbg_ptr, arg0);
  }
  /**
   * @returns {number}
   */
  get maxDamageDealtPerRound() {
    const ret = wasm.__wbg_get_actionpointessentials_ckbPerActionPoint(this.__wbg_ptr);
    return ret;
  }
  /**
   * @param {number} arg0
   */
  set maxDamageDealtPerRound(arg0) {
    wasm.__wbg_set_actionpointessentials_ckbPerActionPoint(this.__wbg_ptr, arg0);
  }
  /**
   * @returns {number}
   */
  get maxDamageDefendedPerRound() {
    const ret = wasm.__wbg_get_battlestatistics_maxDamageDefendedPerRound(this.__wbg_ptr);
    return ret;
  }
  /**
   * @param {number} arg0
   */
  set maxDamageDefendedPerRound(arg0) {
    wasm.__wbg_set_battlestatistics_maxDamageDefendedPerRound(this.__wbg_ptr, arg0);
  }
  /**
   * @returns {number}
   */
  get maxHealingPerRound() {
    const ret = wasm.__wbg_get_battlestatistics_maxHealingPerRound(this.__wbg_ptr);
    return ret;
  }
  /**
   * @param {number} arg0
   */
  set maxHealingPerRound(arg0) {
    wasm.__wbg_set_battlestatistics_maxHealingPerRound(this.__wbg_ptr, arg0);
  }
  /**
   * @returns {number}
   */
  get maxHpLossPercent() {
    const ret = wasm.__wbg_get_battlestatistics_maxHpLossPercent(this.__wbg_ptr);
    return ret;
  }
  /**
   * @param {number} arg0
   */
  set maxHpLossPercent(arg0) {
    wasm.__wbg_set_battlestatistics_maxHpLossPercent(this.__wbg_ptr, arg0);
  }
  /**
   * @returns {number}
   */
  get effectImposedCount() {
    const ret = wasm.__wbg_get_battlestatistics_effectImposedCount(this.__wbg_ptr);
    return ret;
  }
  /**
   * @param {number} arg0
   */
  set effectImposedCount(arg0) {
    wasm.__wbg_set_battlestatistics_effectImposedCount(this.__wbg_ptr, arg0);
  }
  /**
   * @returns {number}
   */
  get roundCount() {
    const ret = wasm.__wbg_get_battlestatistics_roundCount(this.__wbg_ptr);
    return ret;
  }
  /**
   * @param {number} arg0
   */
  set roundCount(arg0) {
    wasm.__wbg_set_battlestatistics_roundCount(this.__wbg_ptr, arg0);
  }
  /**
   * @returns {number}
   */
  get score() {
    const ret = wasm.battlestatistics_score(this.__wbg_ptr);
    return ret;
  }
};
var CardFinalization = typeof FinalizationRegistry === "undefined" ? { register: () => {
}, unregister: () => {
} } : new FinalizationRegistry((ptr) => wasm.__wbg_card_free(ptr >>> 0, 1));
var Card = class _Card {
  static __wrap(ptr) {
    ptr = ptr >>> 0;
    const obj = Object.create(_Card.prototype);
    obj.__wbg_ptr = ptr;
    CardFinalization.register(obj, obj.__wbg_ptr, obj);
    return obj;
  }
  __destroy_into_raw() {
    const ptr = this.__wbg_ptr;
    this.__wbg_ptr = 0;
    CardFinalization.unregister(this);
    return ptr;
  }
  free() {
    const ptr = this.__destroy_into_raw();
    wasm.__wbg_card_free(ptr, 0);
  }
  /**
   * @returns {CardName}
   */
  get name() {
    const ret = wasm.__wbg_get_card_name(this.__wbg_ptr);
    return ret;
  }
  /**
   * @param {CardName} arg0
   */
  set name(arg0) {
    wasm.__wbg_set_card_name(this.__wbg_ptr, arg0);
  }
  /**
   * @returns {boolean}
   */
  get golden() {
    const ret = wasm.__wbg_get_card_golden(this.__wbg_ptr);
    return ret !== 0;
  }
  /**
   * @param {boolean} arg0
   */
  set golden(arg0) {
    wasm.__wbg_set_card_golden(this.__wbg_ptr, arg0);
  }
  /**
   * @returns {CardTarget}
   */
  get target() {
    const ret = wasm.__wbg_get_card_target(this.__wbg_ptr);
    return ret;
  }
  /**
   * @param {CardTarget} arg0
   */
  set target(arg0) {
    wasm.__wbg_set_card_target(this.__wbg_ptr, arg0);
  }
  /**
   * @returns {number}
   */
  get cost() {
    const ret = wasm.__wbg_get_card_cost(this.__wbg_ptr);
    return ret;
  }
  /**
   * @param {number} arg0
   */
  set cost(arg0) {
    wasm.__wbg_set_card_cost(this.__wbg_ptr, arg0);
  }
  /**
   * @returns {boolean}
   */
  get exile() {
    const ret = wasm.__wbg_get_card_exile(this.__wbg_ptr);
    return ret !== 0;
  }
  /**
   * @param {boolean} arg0
   */
  set exile(arg0) {
    wasm.__wbg_set_card_exile(this.__wbg_ptr, arg0);
  }
  /**
   * @returns {Awake | undefined}
   */
  get awake() {
    const ret = wasm.__wbg_get_card_awake(this.__wbg_ptr);
    return ret === 0 ? void 0 : Awake.__wrap(ret);
  }
  /**
   * @param {Awake | undefined} [arg0]
   */
  set awake(arg0) {
    let ptr0 = 0;
    if (!isLikeNone(arg0)) {
      _assertClass(arg0, Awake);
      ptr0 = arg0.__destroy_into_raw();
    }
    wasm.__wbg_set_card_awake(this.__wbg_ptr, ptr0);
  }
  /**
   * @returns {CardCategory}
   */
  get category() {
    const ret = wasm.__wbg_get_card_category(this.__wbg_ptr);
    return ret;
  }
  /**
   * @param {CardCategory} arg0
   */
  set category(arg0) {
    wasm.__wbg_set_card_category(this.__wbg_ptr, arg0);
  }
  /**
   * @returns {string}
   */
  get description() {
    let deferred1_0;
    let deferred1_1;
    try {
      const retptr = wasm.__wbindgen_add_to_stack_pointer(-16);
      wasm.card_description(retptr, this.__wbg_ptr);
      var r0 = getDataViewMemory0().getInt32(retptr + 4 * 0, true);
      var r1 = getDataViewMemory0().getInt32(retptr + 4 * 1, true);
      deferred1_0 = r0;
      deferred1_1 = r1;
      return getStringFromWasm0(r0, r1);
    } finally {
      wasm.__wbindgen_add_to_stack_pointer(16);
      wasm.__wbindgen_export_4(deferred1_0, deferred1_1, 1);
    }
  }
  /**
   * @returns {any[]}
   */
  get tags() {
    try {
      const retptr = wasm.__wbindgen_add_to_stack_pointer(-16);
      wasm.card_tags(retptr, this.__wbg_ptr);
      var r0 = getDataViewMemory0().getInt32(retptr + 4 * 0, true);
      var r1 = getDataViewMemory0().getInt32(retptr + 4 * 1, true);
      var v1 = getArrayJsValueFromWasm0(r0, r1).slice();
      wasm.__wbindgen_export_4(r0, r1 * 4, 4);
      return v1;
    } finally {
      wasm.__wbindgen_add_to_stack_pointer(16);
    }
  }
};
var CardRuntimeFinalization = typeof FinalizationRegistry === "undefined" ? { register: () => {
}, unregister: () => {
} } : new FinalizationRegistry((ptr) => wasm.__wbg_cardruntime_free(ptr >>> 0, 1));
var CardRuntime = class _CardRuntime {
  static __wrap(ptr) {
    ptr = ptr >>> 0;
    const obj = Object.create(_CardRuntime.prototype);
    obj.__wbg_ptr = ptr;
    CardRuntimeFinalization.register(obj, obj.__wbg_ptr, obj);
    return obj;
  }
  __destroy_into_raw() {
    const ptr = this.__wbg_ptr;
    this.__wbg_ptr = 0;
    CardRuntimeFinalization.unregister(this);
    return ptr;
  }
  free() {
    const ptr = this.__destroy_into_raw();
    wasm.__wbg_cardruntime_free(ptr, 0);
  }
  /**
   * @returns {number}
   */
  get parentRuntimeId() {
    const ret = wasm.__wbg_get_cardruntime_parentRuntimeId(this.__wbg_ptr);
    return ret;
  }
  /**
   * @param {number} arg0
   */
  set parentRuntimeId(arg0) {
    wasm.__wbg_set_cardruntime_parentRuntimeId(this.__wbg_ptr, arg0);
  }
  /**
   * @returns {number}
   */
  get runtimeId() {
    const ret = wasm.__wbg_get_cardruntime_runtimeId(this.__wbg_ptr);
    return ret;
  }
  /**
   * @param {number} arg0
   */
  set runtimeId(arg0) {
    wasm.__wbg_set_cardruntime_runtimeId(this.__wbg_ptr, arg0);
  }
  /**
   * @returns {number}
   */
  get cost() {
    const ret = wasm.__wbg_get_cardruntime_cost(this.__wbg_ptr);
    return ret;
  }
  /**
   * @param {number} arg0
   */
  set cost(arg0) {
    wasm.__wbg_set_cardruntime_cost(this.__wbg_ptr, arg0);
  }
  /**
   * @returns {boolean}
   */
  get exile() {
    const ret = wasm.__wbg_get_cardruntime_exile(this.__wbg_ptr);
    return ret !== 0;
  }
  /**
   * @param {boolean} arg0
   */
  set exile(arg0) {
    wasm.__wbg_set_cardruntime_exile(this.__wbg_ptr, arg0);
  }
  /**
   * @returns {number}
   */
  get awake() {
    const ret = wasm.__wbg_get_cardruntime_awake(this.__wbg_ptr);
    return ret;
  }
  /**
   * @param {number} arg0
   */
  set awake(arg0) {
    wasm.__wbg_set_cardruntime_awake(this.__wbg_ptr, arg0);
  }
  /**
   * @returns {CardTarget}
   */
  get target() {
    const ret = wasm.__wbg_get_cardruntime_target(this.__wbg_ptr);
    return ret;
  }
  /**
   * @param {CardTarget} arg0
   */
  set target(arg0) {
    wasm.__wbg_set_cardruntime_target(this.__wbg_ptr, arg0);
  }
  /**
   * @returns {Card}
   */
  get raw() {
    const ret = wasm.cardruntime_raw(this.__wbg_ptr);
    return Card.__wrap(ret);
  }
  /**
   * @returns {boolean}
   */
  implFlag() {
    const ret = wasm.cardruntime_implFlag(this.__wbg_ptr);
    return ret !== 0;
  }
  /**
   * @returns {number}
   */
  implValue() {
    const ret = wasm.cardruntime_implValue(this.__wbg_ptr);
    return ret;
  }
};
var CardSelectionFinalization = typeof FinalizationRegistry === "undefined" ? { register: () => {
}, unregister: () => {
} } : new FinalizationRegistry((ptr) => wasm.__wbg_cardselection_free(ptr >>> 0, 1));
var CardSelection = class _CardSelection {
  static __wrap(ptr) {
    ptr = ptr >>> 0;
    const obj = Object.create(_CardSelection.prototype);
    obj.__wbg_ptr = ptr;
    CardSelectionFinalization.register(obj, obj.__wbg_ptr, obj);
    return obj;
  }
  __destroy_into_raw() {
    const ptr = this.__wbg_ptr;
    this.__wbg_ptr = 0;
    CardSelectionFinalization.unregister(this);
    return ptr;
  }
  free() {
    const ptr = this.__destroy_into_raw();
    wasm.__wbg_cardselection_free(ptr, 0);
  }
  /**
   * @returns {CardSelectionSource}
   */
  get source() {
    const ret = wasm.__wbg_get_cardselection_source(this.__wbg_ptr);
    return ret;
  }
  /**
   * @param {CardSelectionSource} arg0
   */
  set source(arg0) {
    wasm.__wbg_set_cardselection_source(this.__wbg_ptr, arg0);
  }
  /**
   * @returns {number}
   */
  get sourceRuntimeId() {
    const ret = wasm.__wbg_get_cardselection_sourceRuntimeId(this.__wbg_ptr);
    return ret;
  }
  /**
   * @param {number} arg0
   */
  set sourceRuntimeId(arg0) {
    wasm.__wbg_set_cardselection_sourceRuntimeId(this.__wbg_ptr, arg0);
  }
  /**
   * @returns {number}
   */
  get count() {
    const ret = wasm.__wbg_get_cardselection_count(this.__wbg_ptr);
    return ret >>> 0;
  }
  /**
   * @param {number} arg0
   */
  set count(arg0) {
    wasm.__wbg_set_cardselection_count(this.__wbg_ptr, arg0);
  }
  /**
   * @param {string} selection
   */
  constructor(selection) {
    const ptr0 = passStringToWasm0(selection, wasm.__wbindgen_export_0, wasm.__wbindgen_export_1);
    const len0 = WASM_VECTOR_LEN;
    const ret = wasm.cardselection_new(ptr0, len0);
    this.__wbg_ptr = ret >>> 0;
    CardSelectionFinalization.register(this, this.__wbg_ptr, this);
    return this;
  }
};
var ContextFinalization = typeof FinalizationRegistry === "undefined" ? { register: () => {
}, unregister: () => {
} } : new FinalizationRegistry((ptr) => wasm.__wbg_context_free(ptr >>> 0, 1));
var Context = class {
  __destroy_into_raw() {
    const ptr = this.__wbg_ptr;
    this.__wbg_ptr = 0;
    ContextFinalization.unregister(this);
    return ptr;
  }
  free() {
    const ptr = this.__destroy_into_raw();
    wasm.__wbg_context_free(ptr, 0);
  }
  /**
   * @param {string} network
   * @param {string} statistics_type_id
   * @param {string} blindbox_cluster_id
   * @param {string} owner
   */
  constructor(network, statistics_type_id, blindbox_cluster_id, owner) {
    try {
      const retptr = wasm.__wbindgen_add_to_stack_pointer(-16);
      const ptr0 = passStringToWasm0(network, wasm.__wbindgen_export_0, wasm.__wbindgen_export_1);
      const len0 = WASM_VECTOR_LEN;
      const ptr1 = passStringToWasm0(statistics_type_id, wasm.__wbindgen_export_0, wasm.__wbindgen_export_1);
      const len1 = WASM_VECTOR_LEN;
      const ptr2 = passStringToWasm0(blindbox_cluster_id, wasm.__wbindgen_export_0, wasm.__wbindgen_export_1);
      const len2 = WASM_VECTOR_LEN;
      const ptr3 = passStringToWasm0(owner, wasm.__wbindgen_export_0, wasm.__wbindgen_export_1);
      const len3 = WASM_VECTOR_LEN;
      wasm.context_new(retptr, ptr0, len0, ptr1, len1, ptr2, len2, ptr3, len3);
      var r0 = getDataViewMemory0().getInt32(retptr + 4 * 0, true);
      var r1 = getDataViewMemory0().getInt32(retptr + 4 * 1, true);
      var r2 = getDataViewMemory0().getInt32(retptr + 4 * 2, true);
      if (r2) {
        throw takeObject(r1);
      }
      this.__wbg_ptr = r0 >>> 0;
      ContextFinalization.register(this, this.__wbg_ptr, this);
      return this;
    } finally {
      wasm.__wbindgen_add_to_stack_pointer(16);
    }
  }
  /**
   * @returns {Promise<Script | undefined>}
   */
  getSessionCardScript() {
    const ret = wasm.context_getSessionCardScript(this.__wbg_ptr);
    return takeObject(ret);
  }
  /**
   * @returns {Uint8Array}
   */
  getTokenScriptArgs() {
    try {
      const retptr = wasm.__wbindgen_add_to_stack_pointer(-16);
      wasm.context_getTokenScriptArgs(retptr, this.__wbg_ptr);
      var r0 = getDataViewMemory0().getInt32(retptr + 4 * 0, true);
      var r1 = getDataViewMemory0().getInt32(retptr + 4 * 1, true);
      var r2 = getDataViewMemory0().getInt32(retptr + 4 * 2, true);
      var r3 = getDataViewMemory0().getInt32(retptr + 4 * 3, true);
      if (r3) {
        throw takeObject(r2);
      }
      var v1 = getArrayU8FromWasm0(r0, r1).slice();
      wasm.__wbindgen_export_4(r0, r1 * 1, 1);
      return v1;
    } finally {
      wasm.__wbindgen_add_to_stack_pointer(16);
    }
  }
  /**
   * @returns {Promise<DobStatistics>}
   */
  getDobStatisticsData() {
    const ret = wasm.context_getDobStatisticsData(this.__wbg_ptr);
    return takeObject(ret);
  }
  /**
   * @returns {Promise<GameGlobal | undefined>}
   */
  getGameGlobalData() {
    const ret = wasm.context_getGameGlobalData(this.__wbg_ptr);
    return takeObject(ret);
  }
  /**
   * @returns {Promise<PveSessionCollection | undefined>}
   */
  getPveSessionData() {
    const ret = wasm.context_getPveSessionData(this.__wbg_ptr);
    return takeObject(ret);
  }
  /**
   * @param {bigint} tip_number
   * @returns {Promise<number>}
   */
  getRealActionPoint(tip_number) {
    const ret = wasm.context_getRealActionPoint(this.__wbg_ptr, tip_number);
    return takeObject(ret);
  }
  /**
   * @param {number} count
   * @returns {Promise<any>}
   */
  buyBox(count) {
    const ret = wasm.context_buyBox(this.__wbg_ptr, count);
    return takeObject(ret);
  }
  /**
   * @param {number} count
   * @returns {Promise<any>}
   */
  unboxBox(count) {
    const ret = wasm.context_unboxBox(this.__wbg_ptr, count);
    return takeObject(ret);
  }
  /**
   * @param {(string)[]} card_spore_ids
   * @returns {Promise<any>}
   */
  mergeCards(card_spore_ids) {
    const ptr0 = passArrayJsValueToWasm0(card_spore_ids, wasm.__wbindgen_export_0);
    const len0 = WASM_VECTOR_LEN;
    const ret = wasm.context_mergeCards(this.__wbg_ptr, ptr0, len0);
    return takeObject(ret);
  }
  /**
   * @returns {Promise<any>}
   */
  initialGameCells() {
    const ret = wasm.context_initialGameCells(this.__wbg_ptr);
    return takeObject(ret);
  }
  /**
   * @param {bigint} tip_header
   * @param {number} level
   * @param {(string)[]} card_spore_ids
   * @param {(Uint8Array)[]} default_card_dnas
   * @returns {Promise<any>}
   */
  beginPve(tip_header, level, card_spore_ids, default_card_dnas) {
    const ptr0 = passArrayJsValueToWasm0(card_spore_ids, wasm.__wbindgen_export_0);
    const len0 = WASM_VECTOR_LEN;
    const ptr1 = passArrayJsValueToWasm0(default_card_dnas, wasm.__wbindgen_export_0);
    const len1 = WASM_VECTOR_LEN;
    const ret = wasm.context_beginPve(this.__wbg_ptr, tip_header, level, ptr0, len0, ptr1, len1);
    return takeObject(ret);
  }
  /**
   * @param {PveRuntime} pve
   * @returns {Promise<any>}
   */
  savePve(pve) {
    _assertClass(pve, PveRuntime);
    const ret = wasm.context_savePve(this.__wbg_ptr, pve.__wbg_ptr);
    return takeObject(ret);
  }
  /**
   * @param {PveRuntime} pve
   * @returns {Promise<any>}
   */
  endPve(pve) {
    _assertClass(pve, PveRuntime);
    const ret = wasm.context_endPve(this.__wbg_ptr, pve.__wbg_ptr);
    return takeObject(ret);
  }
  /**
   * @param {bigint} tip_number
   * @returns {Promise<any>}
   */
  chargeActionPoint(tip_number) {
    const ret = wasm.context_chargeActionPoint(this.__wbg_ptr, tip_number);
    return takeObject(ret);
  }
};
var DobStatisticsFinalization = typeof FinalizationRegistry === "undefined" ? { register: () => {
}, unregister: () => {
} } : new FinalizationRegistry((ptr) => wasm.__wbg_dobstatistics_free(ptr >>> 0, 1));
var DobStatistics = class _DobStatistics {
  static __wrap(ptr) {
    ptr = ptr >>> 0;
    const obj = Object.create(_DobStatistics.prototype);
    obj.__wbg_ptr = ptr;
    DobStatisticsFinalization.register(obj, obj.__wbg_ptr, obj);
    return obj;
  }
  __destroy_into_raw() {
    const ptr = this.__wbg_ptr;
    this.__wbg_ptr = 0;
    DobStatisticsFinalization.unregister(this);
    return ptr;
  }
  free() {
    const ptr = this.__destroy_into_raw();
    wasm.__wbg_dobstatistics_free(ptr, 0);
  }
  /**
   * @returns {number}
   */
  get globalUnboxedCount() {
    const ret = wasm.__wbg_get_dobstatistics_globalUnboxedCount(this.__wbg_ptr);
    return ret >>> 0;
  }
  /**
   * @param {number} arg0
   */
  set globalUnboxedCount(arg0) {
    wasm.__wbg_set_dobstatistics_globalUnboxedCount(this.__wbg_ptr, arg0);
  }
  /**
   * @returns {bigint}
   */
  get ckbBase() {
    const ret = wasm.__wbg_get_dobstatistics_ckbBase(this.__wbg_ptr);
    return BigInt.asUintN(64, ret);
  }
  /**
   * @param {bigint} arg0
   */
  set ckbBase(arg0) {
    wasm.__wbg_set_dobstatistics_ckbBase(this.__wbg_ptr, arg0);
  }
  /**
   * @returns {bigint}
   */
  get ckbIncreasePerUnbox() {
    const ret = wasm.__wbg_get_dobstatistics_ckbIncreasePerUnbox(this.__wbg_ptr);
    return BigInt.asUintN(64, ret);
  }
  /**
   * @param {bigint} arg0
   */
  set ckbIncreasePerUnbox(arg0) {
    wasm.__wbg_set_dobstatistics_ckbIncreasePerUnbox(this.__wbg_ptr, arg0);
  }
  /**
   * @returns {Script}
   */
  get protocolPayee() {
    const ret = wasm.dobstatistics_protocolPayee(this.__wbg_ptr);
    return Script.__wrap(ret);
  }
  /**
   * @returns {string}
   */
  get protocolOwnerHash() {
    let deferred1_0;
    let deferred1_1;
    try {
      const retptr = wasm.__wbindgen_add_to_stack_pointer(-16);
      wasm.dobstatistics_protocolOwnerHash(retptr, this.__wbg_ptr);
      var r0 = getDataViewMemory0().getInt32(retptr + 4 * 0, true);
      var r1 = getDataViewMemory0().getInt32(retptr + 4 * 1, true);
      deferred1_0 = r0;
      deferred1_1 = r1;
      return getStringFromWasm0(r0, r1);
    } finally {
      wasm.__wbindgen_add_to_stack_pointer(16);
      wasm.__wbindgen_export_4(deferred1_0, deferred1_1, 1);
    }
  }
  /**
   * @returns {string}
   */
  get blindboxClusterId() {
    let deferred1_0;
    let deferred1_1;
    try {
      const retptr = wasm.__wbindgen_add_to_stack_pointer(-16);
      wasm.dobstatistics_blindboxClusterId(retptr, this.__wbg_ptr);
      var r0 = getDataViewMemory0().getInt32(retptr + 4 * 0, true);
      var r1 = getDataViewMemory0().getInt32(retptr + 4 * 1, true);
      deferred1_0 = r0;
      deferred1_1 = r1;
      return getStringFromWasm0(r0, r1);
    } finally {
      wasm.__wbindgen_add_to_stack_pointer(16);
      wasm.__wbindgen_export_4(deferred1_0, deferred1_1, 1);
    }
  }
  /**
   * @returns {string}
   */
  get cardClusterId() {
    let deferred1_0;
    let deferred1_1;
    try {
      const retptr = wasm.__wbindgen_add_to_stack_pointer(-16);
      wasm.dobstatistics_cardClusterId(retptr, this.__wbg_ptr);
      var r0 = getDataViewMemory0().getInt32(retptr + 4 * 0, true);
      var r1 = getDataViewMemory0().getInt32(retptr + 4 * 1, true);
      deferred1_0 = r0;
      deferred1_1 = r1;
      return getStringFromWasm0(r0, r1);
    } finally {
      wasm.__wbindgen_add_to_stack_pointer(16);
      wasm.__wbindgen_export_4(deferred1_0, deferred1_1, 1);
    }
  }
};
var EffectFinalization = typeof FinalizationRegistry === "undefined" ? { register: () => {
}, unregister: () => {
} } : new FinalizationRegistry((ptr) => wasm.__wbg_effect_free(ptr >>> 0, 1));
var Effect = class _Effect {
  static __wrap(ptr) {
    ptr = ptr >>> 0;
    const obj = Object.create(_Effect.prototype);
    obj.__wbg_ptr = ptr;
    EffectFinalization.register(obj, obj.__wbg_ptr, obj);
    return obj;
  }
  __destroy_into_raw() {
    const ptr = this.__wbg_ptr;
    this.__wbg_ptr = 0;
    EffectFinalization.unregister(this);
    return ptr;
  }
  free() {
    const ptr = this.__destroy_into_raw();
    wasm.__wbg_effect_free(ptr, 0);
  }
  /**
   * @returns {EffectName}
   */
  get name() {
    const ret = wasm.__wbg_get_effect_name(this.__wbg_ptr);
    return ret;
  }
  /**
   * @param {EffectName} arg0
   */
  set name(arg0) {
    wasm.__wbg_set_effect_name(this.__wbg_ptr, arg0);
  }
  /**
   * @returns {boolean}
   */
  get trap() {
    const ret = wasm.__wbg_get_effect_trap(this.__wbg_ptr);
    return ret !== 0;
  }
  /**
   * @param {boolean} arg0
   */
  set trap(arg0) {
    wasm.__wbg_set_effect_trap(this.__wbg_ptr, arg0);
  }
  /**
   * @returns {boolean | undefined}
   */
  get ownerSource() {
    const ret = wasm.__wbg_get_effect_ownerSource(this.__wbg_ptr);
    return ret === 16777215 ? void 0 : ret !== 0;
  }
  /**
   * @param {boolean | undefined} [arg0]
   */
  set ownerSource(arg0) {
    wasm.__wbg_set_effect_ownerSource(this.__wbg_ptr, isLikeNone(arg0) ? 16777215 : arg0 ? 1 : 0);
  }
  /**
   * @returns {boolean | undefined}
   */
  get ownerTarget() {
    const ret = wasm.__wbg_get_effect_ownerTarget(this.__wbg_ptr);
    return ret === 16777215 ? void 0 : ret !== 0;
  }
  /**
   * @param {boolean | undefined} [arg0]
   */
  set ownerTarget(arg0) {
    wasm.__wbg_set_effect_ownerTarget(this.__wbg_ptr, isLikeNone(arg0) ? 16777215 : arg0 ? 1 : 0);
  }
  /**
   * @returns {number | undefined}
   */
  get value() {
    const ret = wasm.__wbg_get_effect_value(this.__wbg_ptr);
    return ret === 16777215 ? void 0 : ret;
  }
  /**
   * @param {number | undefined} [arg0]
   */
  set value(arg0) {
    wasm.__wbg_set_effect_value(this.__wbg_ptr, isLikeNone(arg0) ? 16777215 : arg0);
  }
  /**
   * @returns {number | undefined}
   */
  get countdown() {
    const ret = wasm.__wbg_get_effect_countdown(this.__wbg_ptr);
    return ret === 16777215 ? void 0 : ret;
  }
  /**
   * @param {number | undefined} [arg0]
   */
  set countdown(arg0) {
    wasm.__wbg_set_effect_countdown(this.__wbg_ptr, isLikeNone(arg0) ? 16777215 : arg0);
  }
  /**
   * @param {string} effect
   */
  constructor(effect) {
    const ptr0 = passStringToWasm0(effect, wasm.__wbindgen_export_0, wasm.__wbindgen_export_1);
    const len0 = WASM_VECTOR_LEN;
    const ret = wasm.effect_new(ptr0, len0);
    this.__wbg_ptr = ret >>> 0;
    EffectFinalization.register(this, this.__wbg_ptr, this);
    return this;
  }
};
var EffectRuntimeFinalization = typeof FinalizationRegistry === "undefined" ? { register: () => {
}, unregister: () => {
} } : new FinalizationRegistry((ptr) => wasm.__wbg_effectruntime_free(ptr >>> 0, 1));
var EffectRuntime = class _EffectRuntime {
  static __wrap(ptr) {
    ptr = ptr >>> 0;
    const obj = Object.create(_EffectRuntime.prototype);
    obj.__wbg_ptr = ptr;
    EffectRuntimeFinalization.register(obj, obj.__wbg_ptr, obj);
    return obj;
  }
  __destroy_into_raw() {
    const ptr = this.__wbg_ptr;
    this.__wbg_ptr = 0;
    EffectRuntimeFinalization.unregister(this);
    return ptr;
  }
  free() {
    const ptr = this.__destroy_into_raw();
    wasm.__wbg_effectruntime_free(ptr, 0);
  }
  /**
   * @returns {number}
   */
  get runtimeId() {
    const ret = wasm.__wbg_get_battlestatistics_maxHpLossPercent(this.__wbg_ptr);
    return ret;
  }
  /**
   * @param {number} arg0
   */
  set runtimeId(arg0) {
    wasm.__wbg_set_battlestatistics_maxHpLossPercent(this.__wbg_ptr, arg0);
  }
  /**
   * @returns {number}
   */
  get parentRuntimeId() {
    const ret = wasm.__wbg_get_battlestatistics_effectImposedCount(this.__wbg_ptr);
    return ret;
  }
  /**
   * @param {number} arg0
   */
  set parentRuntimeId(arg0) {
    wasm.__wbg_set_battlestatistics_effectImposedCount(this.__wbg_ptr, arg0);
  }
  /**
   * @returns {number}
   */
  get value() {
    const ret = wasm.__wbg_get_effectruntime_value(this.__wbg_ptr);
    return ret;
  }
  /**
   * @param {number} arg0
   */
  set value(arg0) {
    wasm.__wbg_set_effectruntime_value(this.__wbg_ptr, arg0);
  }
  /**
   * @returns {number}
   */
  get countdown() {
    const ret = wasm.__wbg_get_effectruntime_countdown(this.__wbg_ptr);
    return ret;
  }
  /**
   * @param {number} arg0
   */
  set countdown(arg0) {
    wasm.__wbg_set_effectruntime_countdown(this.__wbg_ptr, arg0);
  }
  /**
   * @returns {Effect}
   */
  get raw() {
    const ret = wasm.effectruntime_raw(this.__wbg_ptr);
    return Effect.__wrap(ret);
  }
};
var EnemyFinalization = typeof FinalizationRegistry === "undefined" ? { register: () => {
}, unregister: () => {
} } : new FinalizationRegistry((ptr) => wasm.__wbg_enemy_free(ptr >>> 0, 1));
var Enemy = class _Enemy {
  static __wrap(ptr) {
    ptr = ptr >>> 0;
    const obj = Object.create(_Enemy.prototype);
    obj.__wbg_ptr = ptr;
    EnemyFinalization.register(obj, obj.__wbg_ptr, obj);
    return obj;
  }
  __destroy_into_raw() {
    const ptr = this.__wbg_ptr;
    this.__wbg_ptr = 0;
    EnemyFinalization.unregister(this);
    return ptr;
  }
  free() {
    const ptr = this.__destroy_into_raw();
    wasm.__wbg_enemy_free(ptr, 0);
  }
  /**
   * @returns {EnemyName}
   */
  get name() {
    const ret = wasm.__wbg_get_enemy_name(this.__wbg_ptr);
    return ret;
  }
  /**
   * @param {EnemyName} arg0
   */
  set name(arg0) {
    wasm.__wbg_set_enemy_name(this.__wbg_ptr, arg0);
  }
  /**
   * @returns {EnemyLevel}
   */
  get level() {
    const ret = wasm.__wbg_get_enemy_level(this.__wbg_ptr);
    return ret;
  }
  /**
   * @param {EnemyLevel} arg0
   */
  set level(arg0) {
    wasm.__wbg_set_enemy_level(this.__wbg_ptr, arg0);
  }
  /**
   * @returns {number}
   */
  get hp() {
    const ret = wasm.__wbg_get_actionpointessentials_maxActionPoint(this.__wbg_ptr);
    return ret;
  }
  /**
   * @param {number} arg0
   */
  set hp(arg0) {
    wasm.__wbg_set_actionpointessentials_maxActionPoint(this.__wbg_ptr, arg0);
  }
  /**
   * @returns {number}
   */
  get gold() {
    const ret = wasm.__wbg_get_actionpointessentials_ckbPerActionPoint(this.__wbg_ptr);
    return ret;
  }
  /**
   * @param {number} arg0
   */
  set gold(arg0) {
    wasm.__wbg_set_actionpointessentials_ckbPerActionPoint(this.__wbg_ptr, arg0);
  }
  /**
   * @returns {number}
   */
  get attack() {
    const ret = wasm.__wbg_get_actionpointessentials_blockPerActionPoint(this.__wbg_ptr);
    return ret;
  }
  /**
   * @param {number} arg0
   */
  set attack(arg0) {
    wasm.__wbg_set_actionpointessentials_blockPerActionPoint(this.__wbg_ptr, arg0);
  }
  /**
   * @returns {number}
   */
  get defense() {
    const ret = wasm.__wbg_get_enemy_defense(this.__wbg_ptr);
    return ret;
  }
  /**
   * @param {number} arg0
   */
  set defense(arg0) {
    wasm.__wbg_set_enemy_defense(this.__wbg_ptr, arg0);
  }
  /**
   * @returns {number}
   */
  get spirit() {
    const ret = wasm.__wbg_get_enemy_spirit(this.__wbg_ptr);
    return ret;
  }
  /**
   * @param {number} arg0
   */
  set spirit(arg0) {
    wasm.__wbg_set_enemy_spirit(this.__wbg_ptr, arg0);
  }
  /**
   * @returns {number}
   */
  get powerupThreshold() {
    const ret = wasm.__wbg_get_enemy_powerupThreshold(this.__wbg_ptr);
    return ret;
  }
  /**
   * @param {number} arg0
   */
  set powerupThreshold(arg0) {
    wasm.__wbg_set_enemy_powerupThreshold(this.__wbg_ptr, arg0);
  }
};
var EnemyRuntimeFinalization = typeof FinalizationRegistry === "undefined" ? { register: () => {
}, unregister: () => {
} } : new FinalizationRegistry((ptr) => wasm.__wbg_enemyruntime_free(ptr >>> 0, 1));
var EnemyRuntime = class _EnemyRuntime {
  static __wrap(ptr) {
    ptr = ptr >>> 0;
    const obj = Object.create(_EnemyRuntime.prototype);
    obj.__wbg_ptr = ptr;
    EnemyRuntimeFinalization.register(obj, obj.__wbg_ptr, obj);
    return obj;
  }
  __destroy_into_raw() {
    const ptr = this.__wbg_ptr;
    this.__wbg_ptr = 0;
    EnemyRuntimeFinalization.unregister(this);
    return ptr;
  }
  free() {
    const ptr = this.__destroy_into_raw();
    wasm.__wbg_enemyruntime_free(ptr, 0);
  }
  /**
   * @returns {number}
   */
  get runtimeId() {
    const ret = wasm.__wbg_get_enemyruntime_runtimeId(this.__wbg_ptr);
    return ret;
  }
  /**
   * @param {number} arg0
   */
  set runtimeId(arg0) {
    wasm.__wbg_set_enemyruntime_runtimeId(this.__wbg_ptr, arg0);
  }
  /**
   * @returns {number}
   */
  get hp() {
    const ret = wasm.__wbg_get_cardruntime_parentRuntimeId(this.__wbg_ptr);
    return ret;
  }
  /**
   * @param {number} arg0
   */
  set hp(arg0) {
    wasm.__wbg_set_cardruntime_parentRuntimeId(this.__wbg_ptr, arg0);
  }
  /**
   * @returns {number}
   */
  get attack() {
    const ret = wasm.__wbg_get_cardruntime_cost(this.__wbg_ptr);
    return ret;
  }
  /**
   * @param {number} arg0
   */
  set attack(arg0) {
    wasm.__wbg_set_cardruntime_cost(this.__wbg_ptr, arg0);
  }
  /**
   * @returns {number}
   */
  get defense() {
    const ret = wasm.__wbg_get_cardruntime_awake(this.__wbg_ptr);
    return ret;
  }
  /**
   * @param {number} arg0
   */
  set defense(arg0) {
    wasm.__wbg_set_cardruntime_awake(this.__wbg_ptr, arg0);
  }
  /**
   * @returns {number}
   */
  get spirit() {
    const ret = wasm.__wbg_get_enemyruntime_spirit(this.__wbg_ptr);
    return ret;
  }
  /**
   * @param {number} arg0
   */
  set spirit(arg0) {
    wasm.__wbg_set_enemyruntime_spirit(this.__wbg_ptr, arg0);
  }
  /**
   * @returns {number}
   */
  get block() {
    const ret = wasm.__wbg_get_cardruntime_runtimeId(this.__wbg_ptr);
    return ret;
  }
  /**
   * @param {number} arg0
   */
  set block(arg0) {
    wasm.__wbg_set_cardruntime_runtimeId(this.__wbg_ptr, arg0);
  }
  /**
   * @returns {number}
   */
  get shield() {
    const ret = wasm.__wbg_get_enemyruntime_shield(this.__wbg_ptr);
    return ret;
  }
  /**
   * @param {number} arg0
   */
  set shield(arg0) {
    wasm.__wbg_set_enemyruntime_shield(this.__wbg_ptr, arg0);
  }
  /**
   * @returns {Enemy}
   */
  get raw() {
    const ret = wasm.enemyruntime_raw(this.__wbg_ptr);
    return Enemy.__wrap(ret);
  }
  /**
   * @returns {(Action)[]}
   */
  get activeActions() {
    try {
      const retptr = wasm.__wbindgen_add_to_stack_pointer(-16);
      wasm.enemyruntime_activeActions(retptr, this.__wbg_ptr);
      var r0 = getDataViewMemory0().getInt32(retptr + 4 * 0, true);
      var r1 = getDataViewMemory0().getInt32(retptr + 4 * 1, true);
      var v1 = getArrayJsValueFromWasm0(r0, r1).slice();
      wasm.__wbindgen_export_4(r0, r1 * 4, 4);
      return v1;
    } finally {
      wasm.__wbindgen_add_to_stack_pointer(16);
    }
  }
  /**
   * @returns {Uint16Array}
   */
  get activeEffects() {
    try {
      const retptr = wasm.__wbindgen_add_to_stack_pointer(-16);
      wasm.enemyruntime_activeEffects(retptr, this.__wbg_ptr);
      var r0 = getDataViewMemory0().getInt32(retptr + 4 * 0, true);
      var r1 = getDataViewMemory0().getInt32(retptr + 4 * 1, true);
      var v1 = getArrayU16FromWasm0(r0, r1).slice();
      wasm.__wbindgen_export_4(r0, r1 * 2, 2);
      return v1;
    } finally {
      wasm.__wbindgen_add_to_stack_pointer(16);
    }
  }
};
var GameGlobalFinalization = typeof FinalizationRegistry === "undefined" ? { register: () => {
}, unregister: () => {
} } : new FinalizationRegistry((ptr) => wasm.__wbg_gameglobal_free(ptr >>> 0, 1));
var GameGlobal = class _GameGlobal {
  static __wrap(ptr) {
    ptr = ptr >>> 0;
    const obj = Object.create(_GameGlobal.prototype);
    obj.__wbg_ptr = ptr;
    GameGlobalFinalization.register(obj, obj.__wbg_ptr, obj);
    return obj;
  }
  __destroy_into_raw() {
    const ptr = this.__wbg_ptr;
    this.__wbg_ptr = 0;
    GameGlobalFinalization.unregister(this);
    return ptr;
  }
  free() {
    const ptr = this.__destroy_into_raw();
    wasm.__wbg_gameglobal_free(ptr, 0);
  }
  /**
   * @returns {number}
   */
  get actionPoint() {
    const ret = wasm.__wbg_get_gameglobal_actionPoint(this.__wbg_ptr);
    return ret;
  }
  /**
   * @param {number} arg0
   */
  set actionPoint(arg0) {
    wasm.__wbg_set_gameglobal_actionPoint(this.__wbg_ptr, arg0);
  }
  /**
   * @returns {number}
   */
  get score() {
    const ret = wasm.__wbg_get_gameglobal_score(this.__wbg_ptr);
    return ret;
  }
  /**
   * @param {number} arg0
   */
  set score(arg0) {
    wasm.__wbg_set_gameglobal_score(this.__wbg_ptr, arg0);
  }
  /**
   * @returns {number}
   */
  get pveCount() {
    const ret = wasm.__wbg_get_gameglobal_pveCount(this.__wbg_ptr);
    return ret;
  }
  /**
   * @param {number} arg0
   */
  set pveCount(arg0) {
    wasm.__wbg_set_gameglobal_pveCount(this.__wbg_ptr, arg0);
  }
  /**
   * @returns {number}
   */
  get pveHuntedGold() {
    const ret = wasm.__wbg_get_gameglobal_pveHuntedGold(this.__wbg_ptr);
    return ret >>> 0;
  }
  /**
   * @param {number} arg0
   */
  set pveHuntedGold(arg0) {
    wasm.__wbg_set_gameglobal_pveHuntedGold(this.__wbg_ptr, arg0);
  }
  /**
   * @returns {number}
   */
  get pveEasyModeCount() {
    const ret = wasm.__wbg_get_gameglobal_pveEasyModeCount(this.__wbg_ptr);
    return ret;
  }
  /**
   * @param {number} arg0
   */
  set pveEasyModeCount(arg0) {
    wasm.__wbg_set_gameglobal_pveEasyModeCount(this.__wbg_ptr, arg0);
  }
  /**
   * @returns {number}
   */
  get pveKilledEnemyCount() {
    const ret = wasm.__wbg_get_gameglobal_pveKilledEnemyCount(this.__wbg_ptr);
    return ret;
  }
  /**
   * @param {number} arg0
   */
  set pveKilledEnemyCount(arg0) {
    wasm.__wbg_set_gameglobal_pveKilledEnemyCount(this.__wbg_ptr, arg0);
  }
  /**
   * @returns {number}
   */
  get pveNormalModeCount() {
    const ret = wasm.__wbg_get_gameglobal_pveNormalModeCount(this.__wbg_ptr);
    return ret;
  }
  /**
   * @param {number} arg0
   */
  set pveNormalModeCount(arg0) {
    wasm.__wbg_set_gameglobal_pveNormalModeCount(this.__wbg_ptr, arg0);
  }
  /**
   * @returns {number}
   */
  get pveHardModeCount() {
    const ret = wasm.__wbg_get_gameglobal_pveHardModeCount(this.__wbg_ptr);
    return ret;
  }
  /**
   * @param {number} arg0
   */
  set pveHardModeCount(arg0) {
    wasm.__wbg_set_gameglobal_pveHardModeCount(this.__wbg_ptr, arg0);
  }
  /**
   * @returns {number}
   */
  get pveCasuedDamage() {
    const ret = wasm.__wbg_get_gameglobal_pveCasuedDamage(this.__wbg_ptr);
    return ret >>> 0;
  }
  /**
   * @param {number} arg0
   */
  set pveCasuedDamage(arg0) {
    wasm.__wbg_set_gameglobal_pveCasuedDamage(this.__wbg_ptr, arg0);
  }
  /**
   * @returns {number}
   */
  get pveSufferedDamage() {
    const ret = wasm.__wbg_get_gameglobal_pveSufferedDamage(this.__wbg_ptr);
    return ret >>> 0;
  }
  /**
   * @param {number} arg0
   */
  set pveSufferedDamage(arg0) {
    wasm.__wbg_set_gameglobal_pveSufferedDamage(this.__wbg_ptr, arg0);
  }
  /**
   * @returns {number}
   */
  get pveBlockedDamage() {
    const ret = wasm.__wbg_get_gameglobal_pveBlockedDamage(this.__wbg_ptr);
    return ret >>> 0;
  }
  /**
   * @param {number} arg0
   */
  set pveBlockedDamage(arg0) {
    wasm.__wbg_set_gameglobal_pveBlockedDamage(this.__wbg_ptr, arg0);
  }
  /**
   * @returns {number}
   */
  get pveHealedHp() {
    const ret = wasm.__wbg_get_gameglobal_pveHealedHp(this.__wbg_ptr);
    return ret >>> 0;
  }
  /**
   * @param {number} arg0
   */
  set pveHealedHp(arg0) {
    wasm.__wbg_set_gameglobal_pveHealedHp(this.__wbg_ptr, arg0);
  }
  /**
   * @returns {number}
   */
  get pvpWinCount() {
    const ret = wasm.__wbg_get_gameglobal_pvpWinCount(this.__wbg_ptr);
    return ret;
  }
  /**
   * @param {number} arg0
   */
  set pvpWinCount(arg0) {
    wasm.__wbg_set_gameglobal_pvpWinCount(this.__wbg_ptr, arg0);
  }
  /**
   * @returns {number}
   */
  get pvpLoseCount() {
    const ret = wasm.__wbg_get_gameglobal_pvpLoseCount(this.__wbg_ptr);
    return ret;
  }
  /**
   * @param {number} arg0
   */
  set pvpLoseCount(arg0) {
    wasm.__wbg_set_gameglobal_pvpLoseCount(this.__wbg_ptr, arg0);
  }
  /**
   * @returns {bigint}
   */
  get pvpLootedGold() {
    const ret = wasm.gameglobal_pvpLootedGold(this.__wbg_ptr);
    return takeObject(ret);
  }
  /**
   * @returns {bigint}
   */
  get pvpStolenGold() {
    const ret = wasm.gameglobal_pvpStolenGold(this.__wbg_ptr);
    return takeObject(ret);
  }
};
var GameStatisticsFinalization = typeof FinalizationRegistry === "undefined" ? { register: () => {
}, unregister: () => {
} } : new FinalizationRegistry((ptr) => wasm.__wbg_gamestatistics_free(ptr >>> 0, 1));
var GameStatistics = class _GameStatistics {
  static __wrap(ptr) {
    ptr = ptr >>> 0;
    const obj = Object.create(_GameStatistics.prototype);
    obj.__wbg_ptr = ptr;
    GameStatisticsFinalization.register(obj, obj.__wbg_ptr, obj);
    return obj;
  }
  __destroy_into_raw() {
    const ptr = this.__wbg_ptr;
    this.__wbg_ptr = 0;
    GameStatisticsFinalization.unregister(this);
    return ptr;
  }
  free() {
    const ptr = this.__destroy_into_raw();
    wasm.__wbg_gamestatistics_free(ptr, 0);
  }
  /**
   * @returns {number}
   */
  get easyModeCount() {
    const ret = wasm.__wbg_get_actionpointessentials_maxActionPoint(this.__wbg_ptr);
    return ret;
  }
  /**
   * @param {number} arg0
   */
  set easyModeCount(arg0) {
    wasm.__wbg_set_actionpointessentials_maxActionPoint(this.__wbg_ptr, arg0);
  }
  /**
   * @returns {number}
   */
  get normalModeCount() {
    const ret = wasm.__wbg_get_actionpointessentials_ckbPerActionPoint(this.__wbg_ptr);
    return ret;
  }
  /**
   * @param {number} arg0
   */
  set normalModeCount(arg0) {
    wasm.__wbg_set_actionpointessentials_ckbPerActionPoint(this.__wbg_ptr, arg0);
  }
  /**
   * @returns {number}
   */
  get hardModeCount() {
    const ret = wasm.__wbg_get_battlestatistics_maxDamageDefendedPerRound(this.__wbg_ptr);
    return ret;
  }
  /**
   * @param {number} arg0
   */
  set hardModeCount(arg0) {
    wasm.__wbg_set_battlestatistics_maxDamageDefendedPerRound(this.__wbg_ptr, arg0);
  }
  /**
   * @returns {number}
   */
  get killedEnemyCount() {
    const ret = wasm.__wbg_get_battlestatistics_maxHealingPerRound(this.__wbg_ptr);
    return ret;
  }
  /**
   * @param {number} arg0
   */
  set killedEnemyCount(arg0) {
    wasm.__wbg_set_battlestatistics_maxHealingPerRound(this.__wbg_ptr, arg0);
  }
  /**
   * @returns {number}
   */
  get casuedDamage() {
    const ret = wasm.__wbg_get_battlestatistics_maxHpLossPercent(this.__wbg_ptr);
    return ret;
  }
  /**
   * @param {number} arg0
   */
  set casuedDamage(arg0) {
    wasm.__wbg_set_battlestatistics_maxHpLossPercent(this.__wbg_ptr, arg0);
  }
  /**
   * @returns {number}
   */
  get sufferredDamage() {
    const ret = wasm.__wbg_get_battlestatistics_effectImposedCount(this.__wbg_ptr);
    return ret;
  }
  /**
   * @param {number} arg0
   */
  set sufferredDamage(arg0) {
    wasm.__wbg_set_battlestatistics_effectImposedCount(this.__wbg_ptr, arg0);
  }
  /**
   * @returns {number}
   */
  get blockedDamage() {
    const ret = wasm.__wbg_get_battlestatistics_roundCount(this.__wbg_ptr);
    return ret;
  }
  /**
   * @param {number} arg0
   */
  set blockedDamage(arg0) {
    wasm.__wbg_set_battlestatistics_roundCount(this.__wbg_ptr, arg0);
  }
  /**
   * @returns {number}
   */
  get healedHp() {
    const ret = wasm.__wbg_get_gamestatistics_healedHp(this.__wbg_ptr);
    return ret;
  }
  /**
   * @param {number} arg0
   */
  set healedHp(arg0) {
    wasm.__wbg_set_gamestatistics_healedHp(this.__wbg_ptr, arg0);
  }
};
var LogFinalization = typeof FinalizationRegistry === "undefined" ? { register: () => {
}, unregister: () => {
} } : new FinalizationRegistry((ptr) => wasm.__wbg_log_free(ptr >>> 0, 1));
var Log = class _Log {
  static __wrap(ptr) {
    ptr = ptr >>> 0;
    const obj = Object.create(_Log.prototype);
    obj.__wbg_ptr = ptr;
    LogFinalization.register(obj, obj.__wbg_ptr, obj);
    return obj;
  }
  __destroy_into_raw() {
    const ptr = this.__wbg_ptr;
    this.__wbg_ptr = 0;
    LogFinalization.unregister(this);
    return ptr;
  }
  free() {
    const ptr = this.__destroy_into_raw();
    wasm.__wbg_log_free(ptr, 0);
  }
  /**
   * @returns {LogName}
   */
  get name() {
    const ret = wasm.__wbg_get_log_name(this.__wbg_ptr);
    return ret;
  }
  /**
   * @param {LogName} arg0
   */
  set name(arg0) {
    wasm.__wbg_set_log_name(this.__wbg_ptr, arg0);
  }
  /**
   * @returns {number}
   */
  get recipient() {
    const ret = wasm.__wbg_get_battlestatistics_maxDamageDefendedPerRound(this.__wbg_ptr);
    return ret;
  }
  /**
   * @param {number} arg0
   */
  set recipient(arg0) {
    wasm.__wbg_set_battlestatistics_maxDamageDefendedPerRound(this.__wbg_ptr, arg0);
  }
  /**
   * @returns {number | undefined}
   */
  get value() {
    const ret = wasm.__wbg_get_log_value(this.__wbg_ptr);
    return ret === 16777215 ? void 0 : ret;
  }
  /**
   * @param {number | undefined} [arg0]
   */
  set value(arg0) {
    wasm.__wbg_set_log_value(this.__wbg_ptr, isLikeNone(arg0) ? 16777215 : arg0);
  }
};
var LootCardFinalization = typeof FinalizationRegistry === "undefined" ? { register: () => {
}, unregister: () => {
} } : new FinalizationRegistry((ptr) => wasm.__wbg_lootcard_free(ptr >>> 0, 1));
var LootCard = class _LootCard {
  static __wrap(ptr) {
    ptr = ptr >>> 0;
    const obj = Object.create(_LootCard.prototype);
    obj.__wbg_ptr = ptr;
    LootCardFinalization.register(obj, obj.__wbg_ptr, obj);
    return obj;
  }
  __destroy_into_raw() {
    const ptr = this.__wbg_ptr;
    this.__wbg_ptr = 0;
    LootCardFinalization.unregister(this);
    return ptr;
  }
  free() {
    const ptr = this.__destroy_into_raw();
    wasm.__wbg_lootcard_free(ptr, 0);
  }
  /**
   * @returns {number}
   */
  get runtimeId() {
    const ret = wasm.__wbg_get_lootcard_runtimeId(this.__wbg_ptr);
    return ret;
  }
  /**
   * @param {number} arg0
   */
  set runtimeId(arg0) {
    wasm.__wbg_set_lootcard_runtimeId(this.__wbg_ptr, arg0);
  }
  /**
   * @returns {Card}
   */
  card() {
    const ret = wasm.lootcard_card(this.__wbg_ptr);
    return Card.__wrap(ret);
  }
};
var PlayerFinalization = typeof FinalizationRegistry === "undefined" ? { register: () => {
}, unregister: () => {
} } : new FinalizationRegistry((ptr) => wasm.__wbg_player_free(ptr >>> 0, 1));
var Player = class _Player {
  static __wrap(ptr) {
    ptr = ptr >>> 0;
    const obj = Object.create(_Player.prototype);
    obj.__wbg_ptr = ptr;
    PlayerFinalization.register(obj, obj.__wbg_ptr, obj);
    return obj;
  }
  __destroy_into_raw() {
    const ptr = this.__wbg_ptr;
    this.__wbg_ptr = 0;
    PlayerFinalization.unregister(this);
    return ptr;
  }
  free() {
    const ptr = this.__destroy_into_raw();
    wasm.__wbg_player_free(ptr, 0);
  }
  /**
   * @returns {PlayerLevel}
   */
  get level() {
    const ret = wasm.__wbg_get_player_level(this.__wbg_ptr);
    return ret;
  }
  /**
   * @param {PlayerLevel} arg0
   */
  set level(arg0) {
    wasm.__wbg_set_player_level(this.__wbg_ptr, arg0);
  }
  /**
   * @returns {number}
   */
  get hp() {
    const ret = wasm.__wbg_get_actionpointessentials_maxActionPoint(this.__wbg_ptr);
    return ret;
  }
  /**
   * @param {number} arg0
   */
  set hp(arg0) {
    wasm.__wbg_set_actionpointessentials_maxActionPoint(this.__wbg_ptr, arg0);
  }
  /**
   * @returns {number}
   */
  get energy() {
    const ret = wasm.__wbg_get_player_energy(this.__wbg_ptr);
    return ret;
  }
  /**
   * @param {number} arg0
   */
  set energy(arg0) {
    wasm.__wbg_set_player_energy(this.__wbg_ptr, arg0);
  }
  /**
   * @returns {number}
   */
  get attack() {
    const ret = wasm.__wbg_get_player_attack(this.__wbg_ptr);
    return ret;
  }
  /**
   * @param {number} arg0
   */
  set attack(arg0) {
    wasm.__wbg_set_player_attack(this.__wbg_ptr, arg0);
  }
  /**
   * @returns {number}
   */
  get defense() {
    const ret = wasm.__wbg_get_actionpointessentials_blockPerActionPoint(this.__wbg_ptr);
    return ret;
  }
  /**
   * @param {number} arg0
   */
  set defense(arg0) {
    wasm.__wbg_set_actionpointessentials_blockPerActionPoint(this.__wbg_ptr, arg0);
  }
  /**
   * @returns {number}
   */
  get spirit() {
    const ret = wasm.__wbg_get_enemy_defense(this.__wbg_ptr);
    return ret;
  }
  /**
   * @param {number} arg0
   */
  set spirit(arg0) {
    wasm.__wbg_set_enemy_defense(this.__wbg_ptr, arg0);
  }
  /**
   * @returns {number}
   */
  get initialHandholdCapacity() {
    const ret = wasm.__wbg_get_enemy_spirit(this.__wbg_ptr);
    return ret;
  }
  /**
   * @param {number} arg0
   */
  set initialHandholdCapacity(arg0) {
    wasm.__wbg_set_enemy_spirit(this.__wbg_ptr, arg0);
  }
  /**
   * @returns {number}
   */
  get initialDeckCapacity() {
    const ret = wasm.__wbg_get_enemy_powerupThreshold(this.__wbg_ptr);
    return ret;
  }
  /**
   * @param {number} arg0
   */
  set initialDeckCapacity(arg0) {
    wasm.__wbg_set_enemy_powerupThreshold(this.__wbg_ptr, arg0);
  }
  /**
   * @returns {number}
   */
  get initialSorceryCapacity() {
    const ret = wasm.__wbg_get_player_initialSorceryCapacity(this.__wbg_ptr);
    return ret;
  }
  /**
   * @param {number} arg0
   */
  set initialSorceryCapacity(arg0) {
    wasm.__wbg_set_player_initialSorceryCapacity(this.__wbg_ptr, arg0);
  }
  /**
   * @returns {number}
   */
  get maxHandholdCapacity() {
    const ret = wasm.__wbg_get_player_maxHandholdCapacity(this.__wbg_ptr);
    return ret;
  }
  /**
   * @param {number} arg0
   */
  set maxHandholdCapacity(arg0) {
    wasm.__wbg_set_player_maxHandholdCapacity(this.__wbg_ptr, arg0);
  }
  /**
   * @returns {number}
   */
  get maxSorceryCapacity() {
    const ret = wasm.__wbg_get_player_maxSorceryCapacity(this.__wbg_ptr);
    return ret;
  }
  /**
   * @param {number} arg0
   */
  set maxSorceryCapacity(arg0) {
    wasm.__wbg_set_player_maxSorceryCapacity(this.__wbg_ptr, arg0);
  }
  /**
   * @returns {number}
   */
  get healActionPoint() {
    const ret = wasm.__wbg_get_player_healActionPoint(this.__wbg_ptr);
    return ret;
  }
  /**
   * @param {number} arg0
   */
  set healActionPoint(arg0) {
    wasm.__wbg_set_player_healActionPoint(this.__wbg_ptr, arg0);
  }
  /**
   * @returns {number}
   */
  get discardActionPoint() {
    const ret = wasm.__wbg_get_effectruntime_value(this.__wbg_ptr);
    return ret;
  }
  /**
   * @param {number} arg0
   */
  set discardActionPoint(arg0) {
    wasm.__wbg_set_effectruntime_value(this.__wbg_ptr, arg0);
  }
  /**
   * @returns {number}
   */
  get easyActionPoint() {
    const ret = wasm.__wbg_get_effectruntime_countdown(this.__wbg_ptr);
    return ret;
  }
  /**
   * @param {number} arg0
   */
  set easyActionPoint(arg0) {
    wasm.__wbg_set_effectruntime_countdown(this.__wbg_ptr, arg0);
  }
  /**
   * @returns {number}
   */
  get normalActionPoint() {
    const ret = wasm.__wbg_get_player_normalActionPoint(this.__wbg_ptr);
    return ret;
  }
  /**
   * @param {number} arg0
   */
  set normalActionPoint(arg0) {
    wasm.__wbg_set_player_normalActionPoint(this.__wbg_ptr, arg0);
  }
  /**
   * @returns {number}
   */
  get hardActionPoint() {
    const ret = wasm.__wbg_get_action_version(this.__wbg_ptr);
    return ret;
  }
  /**
   * @param {number} arg0
   */
  set hardActionPoint(arg0) {
    wasm.__wbg_set_action_version(this.__wbg_ptr, arg0);
  }
  /**
   * @param {string} player
   */
  constructor(player) {
    const ptr0 = passStringToWasm0(player, wasm.__wbindgen_export_0, wasm.__wbindgen_export_1);
    const len0 = WASM_VECTOR_LEN;
    const ret = wasm.player_new(ptr0, len0);
    this.__wbg_ptr = ret >>> 0;
    PlayerFinalization.register(this, this.__wbg_ptr, this);
    return this;
  }
};
var PlayerLevelEssentialsFinalization = typeof FinalizationRegistry === "undefined" ? { register: () => {
}, unregister: () => {
} } : new FinalizationRegistry((ptr) => wasm.__wbg_playerlevelessentials_free(ptr >>> 0, 1));
var PlayerLevelEssentials = class _PlayerLevelEssentials {
  static __wrap(ptr) {
    ptr = ptr >>> 0;
    const obj = Object.create(_PlayerLevelEssentials.prototype);
    obj.__wbg_ptr = ptr;
    PlayerLevelEssentialsFinalization.register(obj, obj.__wbg_ptr, obj);
    return obj;
  }
  __destroy_into_raw() {
    const ptr = this.__wbg_ptr;
    this.__wbg_ptr = 0;
    PlayerLevelEssentialsFinalization.unregister(this);
    return ptr;
  }
  free() {
    const ptr = this.__destroy_into_raw();
    wasm.__wbg_playerlevelessentials_free(ptr, 0);
  }
  /**
   * @returns {number}
   */
  get minHp() {
    const ret = wasm.__wbg_get_actionpointessentials_maxActionPoint(this.__wbg_ptr);
    return ret;
  }
  /**
   * @param {number} arg0
   */
  set minHp(arg0) {
    wasm.__wbg_set_actionpointessentials_maxActionPoint(this.__wbg_ptr, arg0);
  }
  /**
   * @returns {number}
   */
  get maxHp() {
    const ret = wasm.__wbg_get_actionpointessentials_ckbPerActionPoint(this.__wbg_ptr);
    return ret;
  }
  /**
   * @param {number} arg0
   */
  set maxHp(arg0) {
    wasm.__wbg_set_actionpointessentials_ckbPerActionPoint(this.__wbg_ptr, arg0);
  }
  /**
   * @returns {number}
   */
  get energyCount() {
    const ret = wasm.__wbg_get_enemy_spirit(this.__wbg_ptr);
    return ret;
  }
  /**
   * @param {number} arg0
   */
  set energyCount(arg0) {
    wasm.__wbg_set_enemy_spirit(this.__wbg_ptr, arg0);
  }
  /**
   * @returns {number}
   */
  get handholdCapacity() {
    const ret = wasm.__wbg_get_enemy_powerupThreshold(this.__wbg_ptr);
    return ret;
  }
  /**
   * @param {number} arg0
   */
  set handholdCapacity(arg0) {
    wasm.__wbg_set_enemy_powerupThreshold(this.__wbg_ptr, arg0);
  }
  /**
   * @returns {number}
   */
  get minAttributePower() {
    const ret = wasm.__wbg_get_player_initialSorceryCapacity(this.__wbg_ptr);
    return ret;
  }
  /**
   * @param {number} arg0
   */
  set minAttributePower(arg0) {
    wasm.__wbg_set_player_initialSorceryCapacity(this.__wbg_ptr, arg0);
  }
  /**
   * @returns {number}
   */
  get maxAttributePower() {
    const ret = wasm.__wbg_get_player_maxHandholdCapacity(this.__wbg_ptr);
    return ret;
  }
  /**
   * @param {number} arg0
   */
  set maxAttributePower(arg0) {
    wasm.__wbg_set_player_maxHandholdCapacity(this.__wbg_ptr, arg0);
  }
  /**
   * @returns {number}
   */
  get sorcerySlotCount() {
    const ret = wasm.__wbg_get_player_maxSorceryCapacity(this.__wbg_ptr);
    return ret;
  }
  /**
   * @param {number} arg0
   */
  set sorcerySlotCount(arg0) {
    wasm.__wbg_set_player_maxSorceryCapacity(this.__wbg_ptr, arg0);
  }
  /**
   * @returns {number}
   */
  get ckbPrice() {
    const ret = wasm.__wbg_get_battlestatistics_maxDamageDefendedPerRound(this.__wbg_ptr);
    return ret;
  }
  /**
   * @param {number} arg0
   */
  set ckbPrice(arg0) {
    wasm.__wbg_set_battlestatistics_maxDamageDefendedPerRound(this.__wbg_ptr, arg0);
  }
  /**
   * @returns {number}
   */
  get healActionPoint() {
    const ret = wasm.__wbg_get_player_healActionPoint(this.__wbg_ptr);
    return ret;
  }
  /**
   * @param {number} arg0
   */
  set healActionPoint(arg0) {
    wasm.__wbg_set_player_healActionPoint(this.__wbg_ptr, arg0);
  }
  /**
   * @returns {number}
   */
  get discardActionPoint() {
    const ret = wasm.__wbg_get_effectruntime_value(this.__wbg_ptr);
    return ret;
  }
  /**
   * @param {number} arg0
   */
  set discardActionPoint(arg0) {
    wasm.__wbg_set_effectruntime_value(this.__wbg_ptr, arg0);
  }
  /**
   * @returns {number}
   */
  get easyActionPoint() {
    const ret = wasm.__wbg_get_effectruntime_countdown(this.__wbg_ptr);
    return ret;
  }
  /**
   * @param {number} arg0
   */
  set easyActionPoint(arg0) {
    wasm.__wbg_set_effectruntime_countdown(this.__wbg_ptr, arg0);
  }
  /**
   * @returns {number}
   */
  get normalActionPoint() {
    const ret = wasm.__wbg_get_player_normalActionPoint(this.__wbg_ptr);
    return ret;
  }
  /**
   * @param {number} arg0
   */
  set normalActionPoint(arg0) {
    wasm.__wbg_set_player_normalActionPoint(this.__wbg_ptr, arg0);
  }
  /**
   * @returns {number}
   */
  get hardActionPoint() {
    const ret = wasm.__wbg_get_action_version(this.__wbg_ptr);
    return ret;
  }
  /**
   * @param {number} arg0
   */
  set hardActionPoint(arg0) {
    wasm.__wbg_set_action_version(this.__wbg_ptr, arg0);
  }
};
var PlayerRuntimeFinalization = typeof FinalizationRegistry === "undefined" ? { register: () => {
}, unregister: () => {
} } : new FinalizationRegistry((ptr) => wasm.__wbg_playerruntime_free(ptr >>> 0, 1));
var PlayerRuntime = class _PlayerRuntime {
  static __wrap(ptr) {
    ptr = ptr >>> 0;
    const obj = Object.create(_PlayerRuntime.prototype);
    obj.__wbg_ptr = ptr;
    PlayerRuntimeFinalization.register(obj, obj.__wbg_ptr, obj);
    return obj;
  }
  __destroy_into_raw() {
    const ptr = this.__wbg_ptr;
    this.__wbg_ptr = 0;
    PlayerRuntimeFinalization.unregister(this);
    return ptr;
  }
  free() {
    const ptr = this.__destroy_into_raw();
    wasm.__wbg_playerruntime_free(ptr, 0);
  }
  /**
   * @returns {number}
   */
  get runtimeId() {
    const ret = wasm.__wbg_get_playerruntime_runtimeId(this.__wbg_ptr);
    return ret;
  }
  /**
   * @param {number} arg0
   */
  set runtimeId(arg0) {
    wasm.__wbg_set_playerruntime_runtimeId(this.__wbg_ptr, arg0);
  }
  /**
   * @returns {number}
   */
  get energy() {
    const ret = wasm.__wbg_get_playerruntime_energy(this.__wbg_ptr);
    return ret;
  }
  /**
   * @param {number} arg0
   */
  set energy(arg0) {
    wasm.__wbg_set_playerruntime_energy(this.__wbg_ptr, arg0);
  }
  /**
   * @returns {number}
   */
  get hp() {
    const ret = wasm.__wbg_get_playerruntime_hp(this.__wbg_ptr);
    return ret;
  }
  /**
   * @param {number} arg0
   */
  set hp(arg0) {
    wasm.__wbg_set_playerruntime_hp(this.__wbg_ptr, arg0);
  }
  /**
   * @returns {number}
   */
  get attack() {
    const ret = wasm.__wbg_get_playerruntime_attack(this.__wbg_ptr);
    return ret;
  }
  /**
   * @param {number} arg0
   */
  set attack(arg0) {
    wasm.__wbg_set_playerruntime_attack(this.__wbg_ptr, arg0);
  }
  /**
   * @returns {number}
   */
  get defense() {
    const ret = wasm.__wbg_get_playerruntime_defense(this.__wbg_ptr);
    return ret;
  }
  /**
   * @param {number} arg0
   */
  set defense(arg0) {
    wasm.__wbg_set_playerruntime_defense(this.__wbg_ptr, arg0);
  }
  /**
   * @returns {number}
   */
  get spirit() {
    const ret = wasm.__wbg_get_playerruntime_spirit(this.__wbg_ptr);
    return ret;
  }
  /**
   * @param {number} arg0
   */
  set spirit(arg0) {
    wasm.__wbg_set_playerruntime_spirit(this.__wbg_ptr, arg0);
  }
  /**
   * @returns {number}
   */
  get block() {
    const ret = wasm.__wbg_get_playerruntime_block(this.__wbg_ptr);
    return ret;
  }
  /**
   * @param {number} arg0
   */
  set block(arg0) {
    wasm.__wbg_set_playerruntime_block(this.__wbg_ptr, arg0);
  }
  /**
   * @returns {number}
   */
  get shield() {
    const ret = wasm.__wbg_get_playerruntime_shield(this.__wbg_ptr);
    return ret;
  }
  /**
   * @param {number} arg0
   */
  set shield(arg0) {
    wasm.__wbg_set_playerruntime_shield(this.__wbg_ptr, arg0);
  }
  /**
   * @returns {Player}
   */
  get raw() {
    const ret = wasm.playerruntime_raw(this.__wbg_ptr);
    return Player.__wrap(ret);
  }
  /**
   * @returns {Uint16Array}
   */
  get activeEffects() {
    try {
      const retptr = wasm.__wbindgen_add_to_stack_pointer(-16);
      wasm.playerruntime_activeEffects(retptr, this.__wbg_ptr);
      var r0 = getDataViewMemory0().getInt32(retptr + 4 * 0, true);
      var r1 = getDataViewMemory0().getInt32(retptr + 4 * 1, true);
      var v1 = getArrayU16FromWasm0(r0, r1).slice();
      wasm.__wbindgen_export_4(r0, r1 * 2, 2);
      return v1;
    } finally {
      wasm.__wbindgen_add_to_stack_pointer(16);
    }
  }
  /**
   * @returns {Uint16Array}
   */
  get equipmentCards() {
    try {
      const retptr = wasm.__wbindgen_add_to_stack_pointer(-16);
      wasm.playerruntime_equipmentCards(retptr, this.__wbg_ptr);
      var r0 = getDataViewMemory0().getInt32(retptr + 4 * 0, true);
      var r1 = getDataViewMemory0().getInt32(retptr + 4 * 1, true);
      var v1 = getArrayU16FromWasm0(r0, r1).slice();
      wasm.__wbindgen_export_4(r0, r1 * 2, 2);
      return v1;
    } finally {
      wasm.__wbindgen_add_to_stack_pointer(16);
    }
  }
  /**
   * @returns {Uint16Array}
   */
  get sorceryCards() {
    try {
      const retptr = wasm.__wbindgen_add_to_stack_pointer(-16);
      wasm.playerruntime_sorceryCards(retptr, this.__wbg_ptr);
      var r0 = getDataViewMemory0().getInt32(retptr + 4 * 0, true);
      var r1 = getDataViewMemory0().getInt32(retptr + 4 * 1, true);
      var v1 = getArrayU16FromWasm0(r0, r1).slice();
      wasm.__wbindgen_export_4(r0, r1 * 2, 2);
      return v1;
    } finally {
      wasm.__wbindgen_add_to_stack_pointer(16);
    }
  }
  /**
   * @returns {Uint16Array}
   */
  get handholdCards() {
    try {
      const retptr = wasm.__wbindgen_add_to_stack_pointer(-16);
      wasm.playerruntime_handholdCards(retptr, this.__wbg_ptr);
      var r0 = getDataViewMemory0().getInt32(retptr + 4 * 0, true);
      var r1 = getDataViewMemory0().getInt32(retptr + 4 * 1, true);
      var v1 = getArrayU16FromWasm0(r0, r1).slice();
      wasm.__wbindgen_export_4(r0, r1 * 2, 2);
      return v1;
    } finally {
      wasm.__wbindgen_add_to_stack_pointer(16);
    }
  }
  /**
   * @returns {Uint16Array}
   */
  get deckCards() {
    try {
      const retptr = wasm.__wbindgen_add_to_stack_pointer(-16);
      wasm.playerruntime_deckCards(retptr, this.__wbg_ptr);
      var r0 = getDataViewMemory0().getInt32(retptr + 4 * 0, true);
      var r1 = getDataViewMemory0().getInt32(retptr + 4 * 1, true);
      var v1 = getArrayU16FromWasm0(r0, r1).slice();
      wasm.__wbindgen_export_4(r0, r1 * 2, 2);
      return v1;
    } finally {
      wasm.__wbindgen_add_to_stack_pointer(16);
    }
  }
  /**
   * @returns {Uint16Array}
   */
  get graveCards() {
    try {
      const retptr = wasm.__wbindgen_add_to_stack_pointer(-16);
      wasm.playerruntime_graveCards(retptr, this.__wbg_ptr);
      var r0 = getDataViewMemory0().getInt32(retptr + 4 * 0, true);
      var r1 = getDataViewMemory0().getInt32(retptr + 4 * 1, true);
      var v1 = getArrayU16FromWasm0(r0, r1).slice();
      wasm.__wbindgen_export_4(r0, r1 * 2, 2);
      return v1;
    } finally {
      wasm.__wbindgen_add_to_stack_pointer(16);
    }
  }
  /**
   * @returns {Uint16Array}
   */
  get exileCards() {
    try {
      const retptr = wasm.__wbindgen_add_to_stack_pointer(-16);
      wasm.playerruntime_exileCards(retptr, this.__wbg_ptr);
      var r0 = getDataViewMemory0().getInt32(retptr + 4 * 0, true);
      var r1 = getDataViewMemory0().getInt32(retptr + 4 * 1, true);
      var v1 = getArrayU16FromWasm0(r0, r1).slice();
      wasm.__wbindgen_export_4(r0, r1 * 2, 2);
      return v1;
    } finally {
      wasm.__wbindgen_add_to_stack_pointer(16);
    }
  }
};
var PveBattleRuntimeFinalization = typeof FinalizationRegistry === "undefined" ? { register: () => {
}, unregister: () => {
} } : new FinalizationRegistry((ptr) => wasm.__wbg_pvebattleruntime_free(ptr >>> 0, 1));
var PveBattleRuntime = class _PveBattleRuntime {
  static __wrap(ptr) {
    ptr = ptr >>> 0;
    const obj = Object.create(_PveBattleRuntime.prototype);
    obj.__wbg_ptr = ptr;
    PveBattleRuntimeFinalization.register(obj, obj.__wbg_ptr, obj);
    return obj;
  }
  __destroy_into_raw() {
    const ptr = this.__wbg_ptr;
    this.__wbg_ptr = 0;
    PveBattleRuntimeFinalization.unregister(this);
    return ptr;
  }
  free() {
    const ptr = this.__destroy_into_raw();
    wasm.__wbg_pvebattleruntime_free(ptr, 0);
  }
  /**
   * @returns {Uint16Array}
   */
  get activeEffects() {
    try {
      const retptr = wasm.__wbindgen_add_to_stack_pointer(-16);
      wasm.pvebattleruntime_activeEffects(retptr, this.__wbg_ptr);
      var r0 = getDataViewMemory0().getInt32(retptr + 4 * 0, true);
      var r1 = getDataViewMemory0().getInt32(retptr + 4 * 1, true);
      var v1 = getArrayU16FromWasm0(r0, r1).slice();
      wasm.__wbindgen_export_4(r0, r1 * 2, 2);
      return v1;
    } finally {
      wasm.__wbindgen_add_to_stack_pointer(16);
    }
  }
};
var PveRuntimeFinalization = typeof FinalizationRegistry === "undefined" ? { register: () => {
}, unregister: () => {
} } : new FinalizationRegistry((ptr) => wasm.__wbg_pveruntime_free(ptr >>> 0, 1));
var PveRuntime = class _PveRuntime {
  static __wrap(ptr) {
    ptr = ptr >>> 0;
    const obj = Object.create(_PveRuntime.prototype);
    obj.__wbg_ptr = ptr;
    PveRuntimeFinalization.register(obj, obj.__wbg_ptr, obj);
    return obj;
  }
  __destroy_into_raw() {
    const ptr = this.__wbg_ptr;
    this.__wbg_ptr = 0;
    PveRuntimeFinalization.unregister(this);
    return ptr;
  }
  free() {
    const ptr = this.__destroy_into_raw();
    wasm.__wbg_pveruntime_free(ptr, 0);
  }
  /**
   * @param {bigint} seed
   * @param {boolean} debug
   */
  constructor(seed, debug) {
    try {
      const retptr = wasm.__wbindgen_add_to_stack_pointer(-16);
      wasm.pveruntime_new(retptr, seed, debug);
      var r0 = getDataViewMemory0().getInt32(retptr + 4 * 0, true);
      var r1 = getDataViewMemory0().getInt32(retptr + 4 * 1, true);
      var r2 = getDataViewMemory0().getInt32(retptr + 4 * 2, true);
      if (r2) {
        throw takeObject(r1);
      }
      this.__wbg_ptr = r0 >>> 0;
      PveRuntimeFinalization.register(this, this.__wbg_ptr, this);
      return this;
    } finally {
      wasm.__wbindgen_add_to_stack_pointer(16);
    }
  }
  /**
   * @param {Uint8Array} archive
   * @param {boolean} debug
   * @returns {PveRuntime}
   */
  static fromArchive(archive, debug) {
    try {
      const retptr = wasm.__wbindgen_add_to_stack_pointer(-16);
      const ptr0 = passArray8ToWasm0(archive, wasm.__wbindgen_export_0);
      const len0 = WASM_VECTOR_LEN;
      wasm.pveruntime_fromArchive(retptr, ptr0, len0, debug);
      var r0 = getDataViewMemory0().getInt32(retptr + 4 * 0, true);
      var r1 = getDataViewMemory0().getInt32(retptr + 4 * 1, true);
      var r2 = getDataViewMemory0().getInt32(retptr + 4 * 2, true);
      if (r2) {
        throw takeObject(r1);
      }
      return _PveRuntime.__wrap(r0);
    } finally {
      wasm.__wbindgen_add_to_stack_pointer(16);
    }
  }
  /**
   * @param {number} level
   * @param {number} action_point
   * @param {(Uint8Array)[]} dna_collection
   * @returns {(Log)[]}
   */
  setupPlayer(level, action_point, dna_collection) {
    try {
      const retptr = wasm.__wbindgen_add_to_stack_pointer(-16);
      const ptr0 = passArrayJsValueToWasm0(dna_collection, wasm.__wbindgen_export_0);
      const len0 = WASM_VECTOR_LEN;
      wasm.pveruntime_setupPlayer(retptr, this.__wbg_ptr, level, action_point, ptr0, len0);
      var r0 = getDataViewMemory0().getInt32(retptr + 4 * 0, true);
      var r1 = getDataViewMemory0().getInt32(retptr + 4 * 1, true);
      var r2 = getDataViewMemory0().getInt32(retptr + 4 * 2, true);
      var r3 = getDataViewMemory0().getInt32(retptr + 4 * 3, true);
      if (r3) {
        throw takeObject(r2);
      }
      var v2 = getArrayJsValueFromWasm0(r0, r1).slice();
      wasm.__wbindgen_export_4(r0, r1 * 4, 4);
      return v2;
    } finally {
      wasm.__wbindgen_add_to_stack_pointer(16);
    }
  }
  /**
   * @param {number} level
   * @returns {(Log)[]}
   */
  enterBattle(level) {
    try {
      const retptr = wasm.__wbindgen_add_to_stack_pointer(-16);
      wasm.pveruntime_enterBattle(retptr, this.__wbg_ptr, level);
      var r0 = getDataViewMemory0().getInt32(retptr + 4 * 0, true);
      var r1 = getDataViewMemory0().getInt32(retptr + 4 * 1, true);
      var r2 = getDataViewMemory0().getInt32(retptr + 4 * 2, true);
      var r3 = getDataViewMemory0().getInt32(retptr + 4 * 3, true);
      if (r3) {
        throw takeObject(r2);
      }
      var v1 = getArrayJsValueFromWasm0(r0, r1).slice();
      wasm.__wbindgen_export_4(r0, r1 * 4, 4);
      return v1;
    } finally {
      wasm.__wbindgen_add_to_stack_pointer(16);
    }
  }
  /**
   * @returns {(Log)[]}
   */
  endRound() {
    try {
      const retptr = wasm.__wbindgen_add_to_stack_pointer(-16);
      wasm.pveruntime_endRound(retptr, this.__wbg_ptr);
      var r0 = getDataViewMemory0().getInt32(retptr + 4 * 0, true);
      var r1 = getDataViewMemory0().getInt32(retptr + 4 * 1, true);
      var r2 = getDataViewMemory0().getInt32(retptr + 4 * 2, true);
      var r3 = getDataViewMemory0().getInt32(retptr + 4 * 3, true);
      if (r3) {
        throw takeObject(r2);
      }
      var v1 = getArrayJsValueFromWasm0(r0, r1).slice();
      wasm.__wbindgen_export_4(r0, r1 * 4, 4);
      return v1;
    } finally {
      wasm.__wbindgen_add_to_stack_pointer(16);
    }
  }
  /**
   * @param {number} card_id
   * @param {number | undefined} [target_id]
   * @returns {(Log)[]}
   */
  spellCard(card_id, target_id) {
    try {
      const retptr = wasm.__wbindgen_add_to_stack_pointer(-16);
      wasm.pveruntime_spellCard(retptr, this.__wbg_ptr, card_id, isLikeNone(target_id) ? 16777215 : target_id);
      var r0 = getDataViewMemory0().getInt32(retptr + 4 * 0, true);
      var r1 = getDataViewMemory0().getInt32(retptr + 4 * 1, true);
      var r2 = getDataViewMemory0().getInt32(retptr + 4 * 2, true);
      var r3 = getDataViewMemory0().getInt32(retptr + 4 * 3, true);
      if (r3) {
        throw takeObject(r2);
      }
      var v1 = getArrayJsValueFromWasm0(r0, r1).slice();
      wasm.__wbindgen_export_4(r0, r1 * 4, 4);
      return v1;
    } finally {
      wasm.__wbindgen_add_to_stack_pointer(16);
    }
  }
  /**
   * @param {Uint16Array} runtime_ids
   * @returns {(Log)[]}
   */
  selectCard(runtime_ids) {
    try {
      const retptr = wasm.__wbindgen_add_to_stack_pointer(-16);
      const ptr0 = passArray16ToWasm0(runtime_ids, wasm.__wbindgen_export_0);
      const len0 = WASM_VECTOR_LEN;
      wasm.pveruntime_selectCard(retptr, this.__wbg_ptr, ptr0, len0);
      var r0 = getDataViewMemory0().getInt32(retptr + 4 * 0, true);
      var r1 = getDataViewMemory0().getInt32(retptr + 4 * 1, true);
      var r2 = getDataViewMemory0().getInt32(retptr + 4 * 2, true);
      var r3 = getDataViewMemory0().getInt32(retptr + 4 * 3, true);
      if (r3) {
        throw takeObject(r2);
      }
      var v2 = getArrayJsValueFromWasm0(r0, r1).slice();
      wasm.__wbindgen_export_4(r0, r1 * 4, 4);
      return v2;
    } finally {
      wasm.__wbindgen_add_to_stack_pointer(16);
    }
  }
  /**
   * @returns {(Log)[]}
   */
  healHp() {
    try {
      const retptr = wasm.__wbindgen_add_to_stack_pointer(-16);
      wasm.pveruntime_healHp(retptr, this.__wbg_ptr);
      var r0 = getDataViewMemory0().getInt32(retptr + 4 * 0, true);
      var r1 = getDataViewMemory0().getInt32(retptr + 4 * 1, true);
      var r2 = getDataViewMemory0().getInt32(retptr + 4 * 2, true);
      var r3 = getDataViewMemory0().getInt32(retptr + 4 * 3, true);
      if (r3) {
        throw takeObject(r2);
      }
      var v1 = getArrayJsValueFromWasm0(r0, r1).slice();
      wasm.__wbindgen_export_4(r0, r1 * 4, 4);
      return v1;
    } finally {
      wasm.__wbindgen_add_to_stack_pointer(16);
    }
  }
  /**
   * @param {number} runtime_id
   * @returns {(Log)[]}
   */
  destroyCard(runtime_id) {
    try {
      const retptr = wasm.__wbindgen_add_to_stack_pointer(-16);
      wasm.pveruntime_destroyCard(retptr, this.__wbg_ptr, runtime_id);
      var r0 = getDataViewMemory0().getInt32(retptr + 4 * 0, true);
      var r1 = getDataViewMemory0().getInt32(retptr + 4 * 1, true);
      var r2 = getDataViewMemory0().getInt32(retptr + 4 * 2, true);
      var r3 = getDataViewMemory0().getInt32(retptr + 4 * 3, true);
      if (r3) {
        throw takeObject(r2);
      }
      var v1 = getArrayJsValueFromWasm0(r0, r1).slice();
      wasm.__wbindgen_export_4(r0, r1 * 4, 4);
      return v1;
    } finally {
      wasm.__wbindgen_add_to_stack_pointer(16);
    }
  }
  /**
   * @param {number} runtime_id
   * @returns {RuntimeUnion}
   */
  getRuntime(runtime_id) {
    try {
      const retptr = wasm.__wbindgen_add_to_stack_pointer(-16);
      wasm.pveruntime_getRuntime(retptr, this.__wbg_ptr, runtime_id);
      var r0 = getDataViewMemory0().getInt32(retptr + 4 * 0, true);
      var r1 = getDataViewMemory0().getInt32(retptr + 4 * 1, true);
      var r2 = getDataViewMemory0().getInt32(retptr + 4 * 2, true);
      if (r2) {
        throw takeObject(r1);
      }
      return RuntimeUnion.__wrap(r0);
    } finally {
      wasm.__wbindgen_add_to_stack_pointer(16);
    }
  }
  /**
   * @returns {PlayerRuntime}
   */
  getPlayer() {
    try {
      const retptr = wasm.__wbindgen_add_to_stack_pointer(-16);
      wasm.pveruntime_getPlayer(retptr, this.__wbg_ptr);
      var r0 = getDataViewMemory0().getInt32(retptr + 4 * 0, true);
      var r1 = getDataViewMemory0().getInt32(retptr + 4 * 1, true);
      var r2 = getDataViewMemory0().getInt32(retptr + 4 * 2, true);
      if (r2) {
        throw takeObject(r1);
      }
      return PlayerRuntime.__wrap(r0);
    } finally {
      wasm.__wbindgen_add_to_stack_pointer(16);
    }
  }
  /**
   * @returns {(CardRuntime)[]}
   */
  getPlayerCards() {
    try {
      const retptr = wasm.__wbindgen_add_to_stack_pointer(-16);
      wasm.pveruntime_getPlayerCards(retptr, this.__wbg_ptr);
      var r0 = getDataViewMemory0().getInt32(retptr + 4 * 0, true);
      var r1 = getDataViewMemory0().getInt32(retptr + 4 * 1, true);
      var r2 = getDataViewMemory0().getInt32(retptr + 4 * 2, true);
      var r3 = getDataViewMemory0().getInt32(retptr + 4 * 3, true);
      if (r3) {
        throw takeObject(r2);
      }
      var v1 = getArrayJsValueFromWasm0(r0, r1).slice();
      wasm.__wbindgen_export_4(r0, r1 * 4, 4);
      return v1;
    } finally {
      wasm.__wbindgen_add_to_stack_pointer(16);
    }
  }
  /**
   * @returns {(LootCard)[]}
   */
  getSystemLootCards() {
    try {
      const retptr = wasm.__wbindgen_add_to_stack_pointer(-16);
      wasm.pveruntime_getSystemLootCards(retptr, this.__wbg_ptr);
      var r0 = getDataViewMemory0().getInt32(retptr + 4 * 0, true);
      var r1 = getDataViewMemory0().getInt32(retptr + 4 * 1, true);
      var r2 = getDataViewMemory0().getInt32(retptr + 4 * 2, true);
      var r3 = getDataViewMemory0().getInt32(retptr + 4 * 3, true);
      if (r3) {
        throw takeObject(r2);
      }
      var v1 = getArrayJsValueFromWasm0(r0, r1).slice();
      wasm.__wbindgen_export_4(r0, r1 * 4, 4);
      return v1;
    } finally {
      wasm.__wbindgen_add_to_stack_pointer(16);
    }
  }
  /**
   * @returns {CardSelection}
   */
  getSystemCardSelection() {
    try {
      const retptr = wasm.__wbindgen_add_to_stack_pointer(-16);
      wasm.pveruntime_getSystemCardSelection(retptr, this.__wbg_ptr);
      var r0 = getDataViewMemory0().getInt32(retptr + 4 * 0, true);
      var r1 = getDataViewMemory0().getInt32(retptr + 4 * 1, true);
      var r2 = getDataViewMemory0().getInt32(retptr + 4 * 2, true);
      if (r2) {
        throw takeObject(r1);
      }
      return CardSelection.__wrap(r0);
    } finally {
      wasm.__wbindgen_add_to_stack_pointer(16);
    }
  }
  /**
   * @returns {number}
   */
  getCurrentActionPoint() {
    const ret = wasm.pveruntime_getCurrentActionPoint(this.__wbg_ptr);
    return ret;
  }
  /**
   * @returns {number}
   */
  getCurrentGold() {
    const ret = wasm.pveruntime_getCurrentGold(this.__wbg_ptr);
    return ret;
  }
  /**
   * @returns {number}
   */
  getCurrentScore() {
    const ret = wasm.pveruntime_getCurrentScore(this.__wbg_ptr);
    return ret;
  }
  /**
   * @returns {EnemyLevel | undefined}
   */
  getCurrentEnemyLevel() {
    const ret = wasm.pveruntime_getCurrentEnemyLevel(this.__wbg_ptr);
    return ret === 3 ? void 0 : ret;
  }
  /**
   * @returns {number}
   */
  getCurrentBattleCount() {
    const ret = wasm.pveruntime_getCurrentBattleCount(this.__wbg_ptr);
    return ret;
  }
  /**
   * @returns {GameStatistics}
   */
  getStatistics() {
    const ret = wasm.pveruntime_getStatistics(this.__wbg_ptr);
    return GameStatistics.__wrap(ret);
  }
  /**
   * @returns {(BattleStatistics)[]}
   */
  getBattleStatistics() {
    try {
      const retptr = wasm.__wbindgen_add_to_stack_pointer(-16);
      wasm.pveruntime_getBattleStatistics(retptr, this.__wbg_ptr);
      var r0 = getDataViewMemory0().getInt32(retptr + 4 * 0, true);
      var r1 = getDataViewMemory0().getInt32(retptr + 4 * 1, true);
      var v1 = getArrayJsValueFromWasm0(r0, r1).slice();
      wasm.__wbindgen_export_4(r0, r1 * 4, 4);
      return v1;
    } finally {
      wasm.__wbindgen_add_to_stack_pointer(16);
    }
  }
  /**
   * @returns {Uint8Array}
   */
  getOperationsBytecode() {
    try {
      const retptr = wasm.__wbindgen_add_to_stack_pointer(-16);
      wasm.pveruntime_getOperationsBytecode(retptr, this.__wbg_ptr);
      var r0 = getDataViewMemory0().getInt32(retptr + 4 * 0, true);
      var r1 = getDataViewMemory0().getInt32(retptr + 4 * 1, true);
      var r2 = getDataViewMemory0().getInt32(retptr + 4 * 2, true);
      if (r2) {
        throw takeObject(r1);
      }
      return takeObject(r0);
    } finally {
      wasm.__wbindgen_add_to_stack_pointer(16);
    }
  }
  clearOperations() {
    wasm.pveruntime_clearOperations(this.__wbg_ptr);
  }
  /**
   * @param {EnemyLevel} level
   * @returns {boolean}
   */
  isEnemyLevelAvailable(level) {
    const ret = wasm.pveruntime_isEnemyLevelAvailable(this.__wbg_ptr, level);
    return ret !== 0;
  }
  debugLogs() {
    wasm.pveruntime_debugLogs(this.__wbg_ptr);
  }
};
var PveSessionFinalization = typeof FinalizationRegistry === "undefined" ? { register: () => {
}, unregister: () => {
} } : new FinalizationRegistry((ptr) => wasm.__wbg_pvesession_free(ptr >>> 0, 1));
var PveSession = class _PveSession {
  static __wrap(ptr) {
    ptr = ptr >>> 0;
    const obj = Object.create(_PveSession.prototype);
    obj.__wbg_ptr = ptr;
    PveSessionFinalization.register(obj, obj.__wbg_ptr, obj);
    return obj;
  }
  __destroy_into_raw() {
    const ptr = this.__wbg_ptr;
    this.__wbg_ptr = 0;
    PveSessionFinalization.unregister(this);
    return ptr;
  }
  free() {
    const ptr = this.__destroy_into_raw();
    wasm.__wbg_pvesession_free(ptr, 0);
  }
  /**
   * @returns {number}
   */
  get version() {
    const ret = wasm.__wbg_get_pvesession_version(this.__wbg_ptr);
    return ret;
  }
  /**
   * @param {number} arg0
   */
  set version(arg0) {
    wasm.__wbg_set_pvesession_version(this.__wbg_ptr, arg0);
  }
  /**
   * @returns {number}
   */
  get actionPoint() {
    const ret = wasm.__wbg_get_pvesession_actionPoint(this.__wbg_ptr);
    return ret;
  }
  /**
   * @param {number} arg0
   */
  set actionPoint(arg0) {
    wasm.__wbg_set_pvesession_actionPoint(this.__wbg_ptr, arg0);
  }
  /**
   * @returns {number}
   */
  get playerLevel() {
    const ret = wasm.__wbg_get_pvesession_playerLevel(this.__wbg_ptr);
    return ret;
  }
  /**
   * @param {number} arg0
   */
  set playerLevel(arg0) {
    wasm.__wbg_set_pvesession_playerLevel(this.__wbg_ptr, arg0);
  }
  /**
   * @returns {Uint8Array}
   */
  get materialHash() {
    try {
      const retptr = wasm.__wbindgen_add_to_stack_pointer(-16);
      wasm.pvesession_materialHash(retptr, this.__wbg_ptr);
      var r0 = getDataViewMemory0().getInt32(retptr + 4 * 0, true);
      var r1 = getDataViewMemory0().getInt32(retptr + 4 * 1, true);
      var r2 = getDataViewMemory0().getInt32(retptr + 4 * 2, true);
      if (r2) {
        throw takeObject(r1);
      }
      return takeObject(r0);
    } finally {
      wasm.__wbindgen_add_to_stack_pointer(16);
    }
  }
};
var PveSessionCollectionFinalization = typeof FinalizationRegistry === "undefined" ? { register: () => {
}, unregister: () => {
} } : new FinalizationRegistry((ptr) => wasm.__wbg_pvesessioncollection_free(ptr >>> 0, 1));
var PveSessionCollection = class _PveSessionCollection {
  static __wrap(ptr) {
    ptr = ptr >>> 0;
    const obj = Object.create(_PveSessionCollection.prototype);
    obj.__wbg_ptr = ptr;
    PveSessionCollectionFinalization.register(obj, obj.__wbg_ptr, obj);
    return obj;
  }
  __destroy_into_raw() {
    const ptr = this.__wbg_ptr;
    this.__wbg_ptr = 0;
    PveSessionCollectionFinalization.unregister(this);
    return ptr;
  }
  free() {
    const ptr = this.__destroy_into_raw();
    wasm.__wbg_pvesessioncollection_free(ptr, 0);
  }
  /**
   * @returns {PveSession}
   */
  get session() {
    const ret = wasm.__wbg_get_pvesessioncollection_session(this.__wbg_ptr);
    return PveSession.__wrap(ret);
  }
  /**
   * @param {PveSession} arg0
   */
  set session(arg0) {
    _assertClass(arg0, PveSession);
    var ptr0 = arg0.__destroy_into_raw();
    wasm.__wbg_set_pvesessioncollection_session(this.__wbg_ptr, ptr0);
  }
  /**
   * @returns {bigint}
   */
  get seed() {
    const ret = wasm.__wbg_get_pvesessioncollection_seed(this.__wbg_ptr);
    return BigInt.asUintN(64, ret);
  }
  /**
   * @param {bigint} arg0
   */
  set seed(arg0) {
    wasm.__wbg_set_pvesessioncollection_seed(this.__wbg_ptr, arg0);
  }
  /**
   * @returns {bigint}
   */
  get blockNumber() {
    const ret = wasm.__wbg_get_pvesessioncollection_blockNumber(this.__wbg_ptr);
    return BigInt.asUintN(64, ret);
  }
  /**
   * @param {bigint} arg0
   */
  set blockNumber(arg0) {
    wasm.__wbg_set_pvesessioncollection_blockNumber(this.__wbg_ptr, arg0);
  }
  /**
   * @returns {bigint}
   */
  get blockTimestamp() {
    const ret = wasm.__wbg_get_pvesessioncollection_blockTimestamp(this.__wbg_ptr);
    return BigInt.asUintN(64, ret);
  }
  /**
   * @param {bigint} arg0
   */
  set blockTimestamp(arg0) {
    wasm.__wbg_set_pvesessioncollection_blockTimestamp(this.__wbg_ptr, arg0);
  }
  /**
   * @returns {PveSessionMaterials}
   */
  get materials() {
    try {
      const retptr = wasm.__wbindgen_add_to_stack_pointer(-16);
      wasm.pvesessioncollection_materials(retptr, this.__wbg_ptr);
      var r0 = getDataViewMemory0().getInt32(retptr + 4 * 0, true);
      var r1 = getDataViewMemory0().getInt32(retptr + 4 * 1, true);
      var r2 = getDataViewMemory0().getInt32(retptr + 4 * 2, true);
      if (r2) {
        throw takeObject(r1);
      }
      return PveSessionMaterials.__wrap(r0);
    } finally {
      wasm.__wbindgen_add_to_stack_pointer(16);
    }
  }
  /**
   * @returns {string}
   */
  get txHash() {
    let deferred2_0;
    let deferred2_1;
    try {
      const retptr = wasm.__wbindgen_add_to_stack_pointer(-16);
      wasm.pvesessioncollection_txHash(retptr, this.__wbg_ptr);
      var r0 = getDataViewMemory0().getInt32(retptr + 4 * 0, true);
      var r1 = getDataViewMemory0().getInt32(retptr + 4 * 1, true);
      var r2 = getDataViewMemory0().getInt32(retptr + 4 * 2, true);
      var r3 = getDataViewMemory0().getInt32(retptr + 4 * 3, true);
      var ptr1 = r0;
      var len1 = r1;
      if (r3) {
        ptr1 = 0;
        len1 = 0;
        throw takeObject(r2);
      }
      deferred2_0 = ptr1;
      deferred2_1 = len1;
      return getStringFromWasm0(ptr1, len1);
    } finally {
      wasm.__wbindgen_add_to_stack_pointer(16);
      wasm.__wbindgen_export_4(deferred2_0, deferred2_1, 1);
    }
  }
};
var PveSessionMaterialsFinalization = typeof FinalizationRegistry === "undefined" ? { register: () => {
}, unregister: () => {
} } : new FinalizationRegistry((ptr) => wasm.__wbg_pvesessionmaterials_free(ptr >>> 0, 1));
var PveSessionMaterials = class _PveSessionMaterials {
  static __wrap(ptr) {
    ptr = ptr >>> 0;
    const obj = Object.create(_PveSessionMaterials.prototype);
    obj.__wbg_ptr = ptr;
    PveSessionMaterialsFinalization.register(obj, obj.__wbg_ptr, obj);
    return obj;
  }
  __destroy_into_raw() {
    const ptr = this.__wbg_ptr;
    this.__wbg_ptr = 0;
    PveSessionMaterialsFinalization.unregister(this);
    return ptr;
  }
  free() {
    const ptr = this.__destroy_into_raw();
    wasm.__wbg_pvesessionmaterials_free(ptr, 0);
  }
  /**
   * @returns {(Uint8Array)[]}
   */
  get dnaCollection() {
    try {
      const retptr = wasm.__wbindgen_add_to_stack_pointer(-16);
      wasm.pvesessionmaterials_dnaCollection(retptr, this.__wbg_ptr);
      var r0 = getDataViewMemory0().getInt32(retptr + 4 * 0, true);
      var r1 = getDataViewMemory0().getInt32(retptr + 4 * 1, true);
      var r2 = getDataViewMemory0().getInt32(retptr + 4 * 2, true);
      var r3 = getDataViewMemory0().getInt32(retptr + 4 * 3, true);
      if (r3) {
        throw takeObject(r2);
      }
      var v1 = getArrayJsValueFromWasm0(r0, r1).slice();
      wasm.__wbindgen_export_4(r0, r1 * 4, 4);
      return v1;
    } finally {
      wasm.__wbindgen_add_to_stack_pointer(16);
    }
  }
  /**
   * @returns {Uint8Array}
   */
  get archiveInput() {
    try {
      const retptr = wasm.__wbindgen_add_to_stack_pointer(-16);
      wasm.pvesessionmaterials_archiveInput(retptr, this.__wbg_ptr);
      var r0 = getDataViewMemory0().getInt32(retptr + 4 * 0, true);
      var r1 = getDataViewMemory0().getInt32(retptr + 4 * 1, true);
      var r2 = getDataViewMemory0().getInt32(retptr + 4 * 2, true);
      if (r2) {
        throw takeObject(r1);
      }
      return takeObject(r0);
    } finally {
      wasm.__wbindgen_add_to_stack_pointer(16);
    }
  }
  /**
   * @returns {Uint8Array}
   */
  get archiveOutput() {
    try {
      const retptr = wasm.__wbindgen_add_to_stack_pointer(-16);
      wasm.pvesessionmaterials_archiveOutput(retptr, this.__wbg_ptr);
      var r0 = getDataViewMemory0().getInt32(retptr + 4 * 0, true);
      var r1 = getDataViewMemory0().getInt32(retptr + 4 * 1, true);
      var r2 = getDataViewMemory0().getInt32(retptr + 4 * 2, true);
      if (r2) {
        throw takeObject(r1);
      }
      return takeObject(r0);
    } finally {
      wasm.__wbindgen_add_to_stack_pointer(16);
    }
  }
};
var PveSystemRuntimeFinalization = typeof FinalizationRegistry === "undefined" ? { register: () => {
}, unregister: () => {
} } : new FinalizationRegistry((ptr) => wasm.__wbg_pvesystemruntime_free(ptr >>> 0, 1));
var PveSystemRuntime = class _PveSystemRuntime {
  static __wrap(ptr) {
    ptr = ptr >>> 0;
    const obj = Object.create(_PveSystemRuntime.prototype);
    obj.__wbg_ptr = ptr;
    PveSystemRuntimeFinalization.register(obj, obj.__wbg_ptr, obj);
    return obj;
  }
  __destroy_into_raw() {
    const ptr = this.__wbg_ptr;
    this.__wbg_ptr = 0;
    PveSystemRuntimeFinalization.unregister(this);
    return ptr;
  }
  free() {
    const ptr = this.__destroy_into_raw();
    wasm.__wbg_pvesystemruntime_free(ptr, 0);
  }
  /**
   * @returns {boolean}
   */
  get gameOver() {
    const ret = wasm.__wbg_get_pvesystemruntime_gameOver(this.__wbg_ptr);
    return ret !== 0;
  }
  /**
   * @param {boolean} arg0
   */
  set gameOver(arg0) {
    wasm.__wbg_set_pvesystemruntime_gameOver(this.__wbg_ptr, arg0);
  }
  /**
   * @returns {number}
   */
  get battleCount() {
    const ret = wasm.__wbg_get_pvesystemruntime_battleCount(this.__wbg_ptr);
    return ret;
  }
  /**
   * @param {number} arg0
   */
  set battleCount(arg0) {
    wasm.__wbg_set_pvesystemruntime_battleCount(this.__wbg_ptr, arg0);
  }
  /**
   * @returns {number}
   */
  get currentBattleRound() {
    const ret = wasm.__wbg_get_pvesystemruntime_currentBattleRound(this.__wbg_ptr);
    return ret;
  }
  /**
   * @param {number} arg0
   */
  set currentBattleRound(arg0) {
    wasm.__wbg_set_pvesystemruntime_currentBattleRound(this.__wbg_ptr, arg0);
  }
  /**
   * @returns {number}
   */
  get gold() {
    const ret = wasm.__wbg_get_pvesystemruntime_gold(this.__wbg_ptr);
    return ret;
  }
  /**
   * @param {number} arg0
   */
  set gold(arg0) {
    wasm.__wbg_set_pvesystemruntime_gold(this.__wbg_ptr, arg0);
  }
  /**
   * @returns {number}
   */
  get actionPoint() {
    const ret = wasm.__wbg_get_pvesystemruntime_actionPoint(this.__wbg_ptr);
    return ret;
  }
  /**
   * @param {number} arg0
   */
  set actionPoint(arg0) {
    wasm.__wbg_set_pvesystemruntime_actionPoint(this.__wbg_ptr, arg0);
  }
  /**
   * @returns {CardSelection}
   */
  get cardSelection() {
    const ret = wasm.__wbg_get_pvesystemruntime_cardSelection(this.__wbg_ptr);
    return CardSelection.__wrap(ret);
  }
  /**
   * @param {CardSelection} arg0
   */
  set cardSelection(arg0) {
    _assertClass(arg0, CardSelection);
    var ptr0 = arg0.__destroy_into_raw();
    wasm.__wbg_set_pvesystemruntime_cardSelection(this.__wbg_ptr, ptr0);
  }
  /**
   * @returns {(CardRuntime)[]}
   */
  get lootCards() {
    try {
      const retptr = wasm.__wbindgen_add_to_stack_pointer(-16);
      wasm.pvesystemruntime_lootCards(retptr, this.__wbg_ptr);
      var r0 = getDataViewMemory0().getInt32(retptr + 4 * 0, true);
      var r1 = getDataViewMemory0().getInt32(retptr + 4 * 1, true);
      var v1 = getArrayJsValueFromWasm0(r0, r1).slice();
      wasm.__wbindgen_export_4(r0, r1 * 4, 4);
      return v1;
    } finally {
      wasm.__wbindgen_add_to_stack_pointer(16);
    }
  }
};
var RuntimeUnionFinalization = typeof FinalizationRegistry === "undefined" ? { register: () => {
}, unregister: () => {
} } : new FinalizationRegistry((ptr) => wasm.__wbg_runtimeunion_free(ptr >>> 0, 1));
var RuntimeUnion = class _RuntimeUnion {
  static __wrap(ptr) {
    ptr = ptr >>> 0;
    const obj = Object.create(_RuntimeUnion.prototype);
    obj.__wbg_ptr = ptr;
    RuntimeUnionFinalization.register(obj, obj.__wbg_ptr, obj);
    return obj;
  }
  __destroy_into_raw() {
    const ptr = this.__wbg_ptr;
    this.__wbg_ptr = 0;
    RuntimeUnionFinalization.unregister(this);
    return ptr;
  }
  free() {
    const ptr = this.__destroy_into_raw();
    wasm.__wbg_runtimeunion_free(ptr, 0);
  }
  /**
   * @returns {number}
   */
  get runtimeId() {
    const ret = wasm.__wbg_get_cardselection_sourceRuntimeId(this.__wbg_ptr);
    return ret;
  }
  /**
   * @param {number} arg0
   */
  set runtimeId(arg0) {
    wasm.__wbg_set_cardselection_sourceRuntimeId(this.__wbg_ptr, arg0);
  }
  /**
   * @returns {RuntimeType}
   */
  get runtimeType() {
    const ret = wasm.__wbg_get_runtimeunion_runtimeType(this.__wbg_ptr);
    return ret;
  }
  /**
   * @param {RuntimeType} arg0
   */
  set runtimeType(arg0) {
    wasm.__wbg_set_runtimeunion_runtimeType(this.__wbg_ptr, arg0);
  }
  /**
   * @returns {CardRuntime}
   */
  card() {
    try {
      const ptr = this.__destroy_into_raw();
      const retptr = wasm.__wbindgen_add_to_stack_pointer(-16);
      wasm.runtimeunion_card(retptr, ptr);
      var r0 = getDataViewMemory0().getInt32(retptr + 4 * 0, true);
      var r1 = getDataViewMemory0().getInt32(retptr + 4 * 1, true);
      var r2 = getDataViewMemory0().getInt32(retptr + 4 * 2, true);
      if (r2) {
        throw takeObject(r1);
      }
      return CardRuntime.__wrap(r0);
    } finally {
      wasm.__wbindgen_add_to_stack_pointer(16);
    }
  }
  /**
   * @returns {PlayerRuntime}
   */
  player() {
    try {
      const ptr = this.__destroy_into_raw();
      const retptr = wasm.__wbindgen_add_to_stack_pointer(-16);
      wasm.runtimeunion_player(retptr, ptr);
      var r0 = getDataViewMemory0().getInt32(retptr + 4 * 0, true);
      var r1 = getDataViewMemory0().getInt32(retptr + 4 * 1, true);
      var r2 = getDataViewMemory0().getInt32(retptr + 4 * 2, true);
      if (r2) {
        throw takeObject(r1);
      }
      return PlayerRuntime.__wrap(r0);
    } finally {
      wasm.__wbindgen_add_to_stack_pointer(16);
    }
  }
  /**
   * @returns {EnemyRuntime}
   */
  enemy() {
    try {
      const ptr = this.__destroy_into_raw();
      const retptr = wasm.__wbindgen_add_to_stack_pointer(-16);
      wasm.runtimeunion_enemy(retptr, ptr);
      var r0 = getDataViewMemory0().getInt32(retptr + 4 * 0, true);
      var r1 = getDataViewMemory0().getInt32(retptr + 4 * 1, true);
      var r2 = getDataViewMemory0().getInt32(retptr + 4 * 2, true);
      if (r2) {
        throw takeObject(r1);
      }
      return EnemyRuntime.__wrap(r0);
    } finally {
      wasm.__wbindgen_add_to_stack_pointer(16);
    }
  }
  /**
   * @returns {EffectRuntime}
   */
  effect() {
    try {
      const ptr = this.__destroy_into_raw();
      const retptr = wasm.__wbindgen_add_to_stack_pointer(-16);
      wasm.runtimeunion_effect(retptr, ptr);
      var r0 = getDataViewMemory0().getInt32(retptr + 4 * 0, true);
      var r1 = getDataViewMemory0().getInt32(retptr + 4 * 1, true);
      var r2 = getDataViewMemory0().getInt32(retptr + 4 * 2, true);
      if (r2) {
        throw takeObject(r1);
      }
      return EffectRuntime.__wrap(r0);
    } finally {
      wasm.__wbindgen_add_to_stack_pointer(16);
    }
  }
  /**
   * @returns {PveBattleRuntime}
   */
  pveBattle() {
    try {
      const ptr = this.__destroy_into_raw();
      const retptr = wasm.__wbindgen_add_to_stack_pointer(-16);
      wasm.runtimeunion_pveBattle(retptr, ptr);
      var r0 = getDataViewMemory0().getInt32(retptr + 4 * 0, true);
      var r1 = getDataViewMemory0().getInt32(retptr + 4 * 1, true);
      var r2 = getDataViewMemory0().getInt32(retptr + 4 * 2, true);
      if (r2) {
        throw takeObject(r1);
      }
      return PveBattleRuntime.__wrap(r0);
    } finally {
      wasm.__wbindgen_add_to_stack_pointer(16);
    }
  }
  /**
   * @returns {PveSystemRuntime}
   */
  pveSystem() {
    try {
      const ptr = this.__destroy_into_raw();
      const retptr = wasm.__wbindgen_add_to_stack_pointer(-16);
      wasm.runtimeunion_pveSystem(retptr, ptr);
      var r0 = getDataViewMemory0().getInt32(retptr + 4 * 0, true);
      var r1 = getDataViewMemory0().getInt32(retptr + 4 * 1, true);
      var r2 = getDataViewMemory0().getInt32(retptr + 4 * 2, true);
      if (r2) {
        throw takeObject(r1);
      }
      return PveSystemRuntime.__wrap(r0);
    } finally {
      wasm.__wbindgen_add_to_stack_pointer(16);
    }
  }
};
var ScriptFinalization = typeof FinalizationRegistry === "undefined" ? { register: () => {
}, unregister: () => {
} } : new FinalizationRegistry((ptr) => wasm.__wbg_script_free(ptr >>> 0, 1));
var Script = class _Script {
  static __wrap(ptr) {
    ptr = ptr >>> 0;
    const obj = Object.create(_Script.prototype);
    obj.__wbg_ptr = ptr;
    ScriptFinalization.register(obj, obj.__wbg_ptr, obj);
    return obj;
  }
  __destroy_into_raw() {
    const ptr = this.__wbg_ptr;
    this.__wbg_ptr = 0;
    ScriptFinalization.unregister(this);
    return ptr;
  }
  free() {
    const ptr = this.__destroy_into_raw();
    wasm.__wbg_script_free(ptr, 0);
  }
  /**
   * @returns {number}
   */
  get hashType() {
    const ret = wasm.__wbg_get_enemyruntime_spirit(this.__wbg_ptr);
    return ret;
  }
  /**
   * @param {number} arg0
   */
  set hashType(arg0) {
    wasm.__wbg_set_script_hashType(this.__wbg_ptr, arg0);
  }
  /**
   * @returns {string}
   */
  get codeHash() {
    let deferred1_0;
    let deferred1_1;
    try {
      const retptr = wasm.__wbindgen_add_to_stack_pointer(-16);
      wasm.script_codeHash(retptr, this.__wbg_ptr);
      var r0 = getDataViewMemory0().getInt32(retptr + 4 * 0, true);
      var r1 = getDataViewMemory0().getInt32(retptr + 4 * 1, true);
      deferred1_0 = r0;
      deferred1_1 = r1;
      return getStringFromWasm0(r0, r1);
    } finally {
      wasm.__wbindgen_add_to_stack_pointer(16);
      wasm.__wbindgen_export_4(deferred1_0, deferred1_1, 1);
    }
  }
  /**
   * @returns {string}
   */
  get args() {
    let deferred1_0;
    let deferred1_1;
    try {
      const retptr = wasm.__wbindgen_add_to_stack_pointer(-16);
      wasm.script_args(retptr, this.__wbg_ptr);
      var r0 = getDataViewMemory0().getInt32(retptr + 4 * 0, true);
      var r1 = getDataViewMemory0().getInt32(retptr + 4 * 1, true);
      deferred1_0 = r0;
      deferred1_1 = r1;
      return getStringFromWasm0(r0, r1);
    } finally {
      wasm.__wbindgen_add_to_stack_pointer(16);
      wasm.__wbindgen_export_4(deferred1_0, deferred1_1, 1);
    }
  }
};
async function __wbg_load(module2, imports) {
  if (typeof Response === "function" && module2 instanceof Response) {
    if (typeof WebAssembly.instantiateStreaming === "function") {
      try {
        return await WebAssembly.instantiateStreaming(module2, imports);
      } catch (e) {
        if (module2.headers.get("Content-Type") != "application/wasm") {
          console.warn("`WebAssembly.instantiateStreaming` failed because your server does not serve Wasm with `application/wasm` MIME type. Falling back to `WebAssembly.instantiate` which is slower. Original error:\n", e);
        } else {
          throw e;
        }
      }
    }
    const bytes = await module2.arrayBuffer();
    return await WebAssembly.instantiate(bytes, imports);
  } else {
    const instance = await WebAssembly.instantiate(module2, imports);
    if (instance instanceof WebAssembly.Instance) {
      return { instance, module: module2 };
    } else {
      return instance;
    }
  }
}
function __wbg_get_imports() {
  const imports = {};
  imports.wbg = {};
  imports.wbg.__wbg_String_8f0eb39a4a4c2f66 = function(arg0, arg1) {
    const ret = String(getObject(arg1));
    const ptr1 = passStringToWasm0(ret, wasm.__wbindgen_export_0, wasm.__wbindgen_export_1);
    const len1 = WASM_VECTOR_LEN;
    getDataViewMemory0().setInt32(arg0 + 4 * 1, len1, true);
    getDataViewMemory0().setInt32(arg0 + 4 * 0, ptr1, true);
  };
  imports.wbg.__wbg_abort_19de2f828ee0874a = function(arg0) {
    getObject(arg0).abort();
  };
  imports.wbg.__wbg_action_new = function(arg0) {
    const ret = Action.__wrap(arg0);
    return addHeapObject(ret);
  };
  imports.wbg.__wbg_append_daea8d1dbe91d314 = function() {
    return handleError(function(arg0, arg1, arg2, arg3, arg4) {
      getObject(arg0).append(getStringFromWasm0(arg1, arg2), getStringFromWasm0(arg3, arg4));
    }, arguments);
  };
  imports.wbg.__wbg_arrayBuffer_d004045654bdb712 = function() {
    return handleError(function(arg0) {
      const ret = getObject(arg0).arrayBuffer();
      return addHeapObject(ret);
    }, arguments);
  };
  imports.wbg.__wbg_battlestatistics_new = function(arg0) {
    const ret = BattleStatistics.__wrap(arg0);
    return addHeapObject(ret);
  };
  imports.wbg.__wbg_buffer_6e1d53ff183194fc = function(arg0) {
    const ret = getObject(arg0).buffer;
    return addHeapObject(ret);
  };
  imports.wbg.__wbg_call_0411c0c3c424db9a = function() {
    return handleError(function(arg0, arg1, arg2) {
      const ret = getObject(arg0).call(getObject(arg1), getObject(arg2));
      return addHeapObject(ret);
    }, arguments);
  };
  imports.wbg.__wbg_call_3114932863209ca6 = function() {
    return handleError(function(arg0, arg1) {
      const ret = getObject(arg0).call(getObject(arg1));
      return addHeapObject(ret);
    }, arguments);
  };
  imports.wbg.__wbg_cardruntime_new = function(arg0) {
    const ret = CardRuntime.__wrap(arg0);
    return addHeapObject(ret);
  };
  imports.wbg.__wbg_crypto_ed58b8e10a292839 = function(arg0) {
    const ret = getObject(arg0).crypto;
    return addHeapObject(ret);
  };
  imports.wbg.__wbg_dobstatistics_new = function(arg0) {
    const ret = DobStatistics.__wrap(arg0);
    return addHeapObject(ret);
  };
  imports.wbg.__wbg_done_adfd3f40364def50 = function(arg0) {
    const ret = getObject(arg0).done;
    return ret;
  };
  imports.wbg.__wbg_entries_ce82e236f8300a53 = function(arg0) {
    const ret = Object.entries(getObject(arg0));
    return addHeapObject(ret);
  };
  imports.wbg.__wbg_fetch_2367a4a7762e7c4a = function(arg0, arg1) {
    const ret = getObject(arg0).fetch(getObject(arg1));
    return addHeapObject(ret);
  };
  imports.wbg.__wbg_fetch_4465c2b10f21a927 = function(arg0) {
    const ret = fetch(getObject(arg0));
    return addHeapObject(ret);
  };
  imports.wbg.__wbg_gameglobal_new = function(arg0) {
    const ret = GameGlobal.__wrap(arg0);
    return addHeapObject(ret);
  };
  imports.wbg.__wbg_getRandomValues_bcb4912f16000dc4 = function() {
    return handleError(function(arg0, arg1) {
      getObject(arg0).getRandomValues(getObject(arg1));
    }, arguments);
  };
  imports.wbg.__wbg_get_68aa371864aa301a = function(arg0, arg1) {
    const ret = getObject(arg0)[arg1 >>> 0];
    return addHeapObject(ret);
  };
  imports.wbg.__wbg_get_92a4780a3beb5fe9 = function() {
    return handleError(function(arg0, arg1) {
      const ret = Reflect.get(getObject(arg0), getObject(arg1));
      return addHeapObject(ret);
    }, arguments);
  };
  imports.wbg.__wbg_getwithrefkey_1dc361bd10053bfe = function(arg0, arg1) {
    const ret = getObject(arg0)[getObject(arg1)];
    return addHeapObject(ret);
  };
  imports.wbg.__wbg_globalThis_1e2ac1d6eee845b3 = function() {
    return handleError(function() {
      const ret = globalThis.globalThis;
      return addHeapObject(ret);
    }, arguments);
  };
  imports.wbg.__wbg_global_f25a574ae080367c = function() {
    return handleError(function() {
      const ret = global.global;
      return addHeapObject(ret);
    }, arguments);
  };
  imports.wbg.__wbg_has_38b228962f492b9b = function() {
    return handleError(function(arg0, arg1) {
      const ret = Reflect.has(getObject(arg0), getObject(arg1));
      return ret;
    }, arguments);
  };
  imports.wbg.__wbg_headers_a5edfea2425875b2 = function(arg0) {
    const ret = getObject(arg0).headers;
    return addHeapObject(ret);
  };
  imports.wbg.__wbg_instanceof_ArrayBuffer_435fcead703e2827 = function(arg0) {
    let result;
    try {
      result = getObject(arg0) instanceof ArrayBuffer;
    } catch (_) {
      result = false;
    }
    const ret = result;
    return ret;
  };
  imports.wbg.__wbg_instanceof_Response_0ec26bd2f8a75ca2 = function(arg0) {
    let result;
    try {
      result = getObject(arg0) instanceof Response;
    } catch (_) {
      result = false;
    }
    const ret = result;
    return ret;
  };
  imports.wbg.__wbg_instanceof_Uint8Array_9b67296cab48238f = function(arg0) {
    let result;
    try {
      result = getObject(arg0) instanceof Uint8Array;
    } catch (_) {
      result = false;
    }
    const ret = result;
    return ret;
  };
  imports.wbg.__wbg_isArray_fcd559a3bcfde1e9 = function(arg0) {
    const ret = Array.isArray(getObject(arg0));
    return ret;
  };
  imports.wbg.__wbg_isSafeInteger_4de146aa53f6e470 = function(arg0) {
    const ret = Number.isSafeInteger(getObject(arg0));
    return ret;
  };
  imports.wbg.__wbg_iterator_7a20c20ce22add0f = function() {
    const ret = Symbol.iterator;
    return addHeapObject(ret);
  };
  imports.wbg.__wbg_length_2e63ba34c4121df5 = function(arg0) {
    const ret = getObject(arg0).length;
    return ret;
  };
  imports.wbg.__wbg_length_e74df4881604f1d9 = function(arg0) {
    const ret = getObject(arg0).length;
    return ret;
  };
  imports.wbg.__wbg_log_dd0b48d03524abe9 = function(arg0) {
    console.log(getObject(arg0));
  };
  imports.wbg.__wbg_log_new = function(arg0) {
    const ret = Log.__wrap(arg0);
    return addHeapObject(ret);
  };
  imports.wbg.__wbg_lootcard_new = function(arg0) {
    const ret = LootCard.__wrap(arg0);
    return addHeapObject(ret);
  };
  imports.wbg.__wbg_msCrypto_0a36e2ec3a343d26 = function(arg0) {
    const ret = getObject(arg0).msCrypto;
    return addHeapObject(ret);
  };
  imports.wbg.__wbg_new_076cac58bb698dd4 = function() {
    const ret = new Object();
    return addHeapObject(ret);
  };
  imports.wbg.__wbg_new_0c28e72025e00594 = function() {
    const ret = new Array();
    return addHeapObject(ret);
  };
  imports.wbg.__wbg_new_1e8ca58d170d6ad0 = function(arg0, arg1) {
    try {
      var state0 = { a: arg0, b: arg1 };
      var cb0 = (arg02, arg12) => {
        const a = state0.a;
        state0.a = 0;
        try {
          return __wbg_adapter_470(a, state0.b, arg02, arg12);
        } finally {
          state0.a = a;
        }
      };
      const ret = new Promise(cb0);
      return addHeapObject(ret);
    } finally {
      state0.a = state0.b = 0;
    }
  };
  imports.wbg.__wbg_new_23362fa370a0a372 = function(arg0) {
    const ret = new Uint8Array(getObject(arg0));
    return addHeapObject(ret);
  };
  imports.wbg.__wbg_new_3f616ed16821b4c5 = function() {
    const ret = /* @__PURE__ */ new Map();
    return addHeapObject(ret);
  };
  imports.wbg.__wbg_new_93cf40e4f48fe902 = function() {
    return handleError(function() {
      const ret = new AbortController();
      return addHeapObject(ret);
    }, arguments);
  };
  imports.wbg.__wbg_new_e2ec18a02bb844cb = function() {
    return handleError(function() {
      const ret = new Headers();
      return addHeapObject(ret);
    }, arguments);
  };
  imports.wbg.__wbg_newnoargs_19a249f4eceaaac3 = function(arg0, arg1) {
    const ret = new Function(getStringFromWasm0(arg0, arg1));
    return addHeapObject(ret);
  };
  imports.wbg.__wbg_newwithbyteoffsetandlength_ee8def7000b7b2be = function(arg0, arg1, arg2) {
    const ret = new Uint8Array(getObject(arg0), arg1 >>> 0, arg2 >>> 0);
    return addHeapObject(ret);
  };
  imports.wbg.__wbg_newwithlength_91de49dea5643c87 = function(arg0) {
    const ret = new Uint8Array(arg0 >>> 0);
    return addHeapObject(ret);
  };
  imports.wbg.__wbg_newwithstrandinit_ee1418802d8d481c = function() {
    return handleError(function(arg0, arg1, arg2) {
      const ret = new Request(getStringFromWasm0(arg0, arg1), getObject(arg2));
      return addHeapObject(ret);
    }, arguments);
  };
  imports.wbg.__wbg_next_c591766a7286b02a = function() {
    return handleError(function(arg0) {
      const ret = getObject(arg0).next();
      return addHeapObject(ret);
    }, arguments);
  };
  imports.wbg.__wbg_next_f387ecc56a94ba00 = function(arg0) {
    const ret = getObject(arg0).next;
    return addHeapObject(ret);
  };
  imports.wbg.__wbg_node_02999533c4ea02e3 = function(arg0) {
    const ret = getObject(arg0).node;
    return addHeapObject(ret);
  };
  imports.wbg.__wbg_process_5c1d670bc53614b8 = function(arg0) {
    const ret = getObject(arg0).process;
    return addHeapObject(ret);
  };
  imports.wbg.__wbg_pvesessioncollection_new = function(arg0) {
    const ret = PveSessionCollection.__wrap(arg0);
    return addHeapObject(ret);
  };
  imports.wbg.__wbg_queueMicrotask_3d422e1ba49c2500 = function(arg0) {
    const ret = getObject(arg0).queueMicrotask;
    return addHeapObject(ret);
  };
  imports.wbg.__wbg_queueMicrotask_f301663ccadbb7d0 = function(arg0) {
    queueMicrotask(getObject(arg0));
  };
  imports.wbg.__wbg_randomFillSync_ab2cfe79ebbf2740 = function() {
    return handleError(function(arg0, arg1) {
      getObject(arg0).randomFillSync(takeObject(arg1));
    }, arguments);
  };
  imports.wbg.__wbg_require_79b1e9274cde3c87 = function() {
    return handleError(function() {
      const ret = module.require;
      return addHeapObject(ret);
    }, arguments);
  };
  imports.wbg.__wbg_resolve_6a311e8bb26423ab = function(arg0) {
    const ret = Promise.resolve(getObject(arg0));
    return addHeapObject(ret);
  };
  imports.wbg.__wbg_script_new = function(arg0) {
    const ret = Script.__wrap(arg0);
    return addHeapObject(ret);
  };
  imports.wbg.__wbg_self_ac4343e4047b83cc = function() {
    return handleError(function() {
      const ret = self.self;
      return addHeapObject(ret);
    }, arguments);
  };
  imports.wbg.__wbg_set_1d975b42d95fd6c6 = function(arg0, arg1, arg2) {
    const ret = getObject(arg0).set(getObject(arg1), getObject(arg2));
    return addHeapObject(ret);
  };
  imports.wbg.__wbg_set_3f1d0b984ed272ed = function(arg0, arg1, arg2) {
    getObject(arg0)[takeObject(arg1)] = takeObject(arg2);
  };
  imports.wbg.__wbg_set_7b70226104a82921 = function(arg0, arg1, arg2) {
    getObject(arg0).set(getObject(arg1), arg2 >>> 0);
  };
  imports.wbg.__wbg_set_a1fb6291729caffb = function(arg0, arg1, arg2) {
    getObject(arg0)[arg1 >>> 0] = takeObject(arg2);
  };
  imports.wbg.__wbg_setbody_a548052400c35526 = function(arg0, arg1) {
    getObject(arg0).body = getObject(arg1);
  };
  imports.wbg.__wbg_setcredentials_6ae5f65d7ad22ffc = function(arg0, arg1) {
    getObject(arg0).credentials = __wbindgen_enum_RequestCredentials[arg1];
  };
  imports.wbg.__wbg_setheaders_1f2d4c08004f4227 = function(arg0, arg1) {
    getObject(arg0).headers = getObject(arg1);
  };
  imports.wbg.__wbg_setmethod_c704d56d480d8580 = function(arg0, arg1, arg2) {
    getObject(arg0).method = getStringFromWasm0(arg1, arg2);
  };
  imports.wbg.__wbg_setmode_26f3e7a9f55ddb2d = function(arg0, arg1) {
    getObject(arg0).mode = __wbindgen_enum_RequestMode[arg1];
  };
  imports.wbg.__wbg_setsignal_de26efe32c2e413d = function(arg0, arg1) {
    getObject(arg0).signal = getObject(arg1);
  };
  imports.wbg.__wbg_signal_fd2d6d0644f16ad8 = function(arg0) {
    const ret = getObject(arg0).signal;
    return addHeapObject(ret);
  };
  imports.wbg.__wbg_status_5f9868b7ed8dd175 = function(arg0) {
    const ret = getObject(arg0).status;
    return ret;
  };
  imports.wbg.__wbg_stringify_f5476f15b5654a07 = function() {
    return handleError(function(arg0) {
      const ret = JSON.stringify(getObject(arg0));
      return addHeapObject(ret);
    }, arguments);
  };
  imports.wbg.__wbg_subarray_b4e9772c34a7f5ba = function(arg0, arg1, arg2) {
    const ret = getObject(arg0).subarray(arg1 >>> 0, arg2 >>> 0);
    return addHeapObject(ret);
  };
  imports.wbg.__wbg_then_5c6469c1e1da9e59 = function(arg0, arg1) {
    const ret = getObject(arg0).then(getObject(arg1));
    return addHeapObject(ret);
  };
  imports.wbg.__wbg_then_faeb8aed8c1629b7 = function(arg0, arg1, arg2) {
    const ret = getObject(arg0).then(getObject(arg1), getObject(arg2));
    return addHeapObject(ret);
  };
  imports.wbg.__wbg_url_ba6c16bbafb59895 = function(arg0, arg1) {
    const ret = getObject(arg1).url;
    const ptr1 = passStringToWasm0(ret, wasm.__wbindgen_export_0, wasm.__wbindgen_export_1);
    const len1 = WASM_VECTOR_LEN;
    getDataViewMemory0().setInt32(arg0 + 4 * 1, len1, true);
    getDataViewMemory0().setInt32(arg0 + 4 * 0, ptr1, true);
  };
  imports.wbg.__wbg_value_30db1d77772f3236 = function(arg0) {
    const ret = getObject(arg0).value;
    return addHeapObject(ret);
  };
  imports.wbg.__wbg_versions_c71aa1626a93e0a1 = function(arg0) {
    const ret = getObject(arg0).versions;
    return addHeapObject(ret);
  };
  imports.wbg.__wbg_window_1a23defd102c72f4 = function() {
    return handleError(function() {
      const ret = window.window;
      return addHeapObject(ret);
    }, arguments);
  };
  imports.wbg.__wbindgen_as_number = function(arg0) {
    const ret = +getObject(arg0);
    return ret;
  };
  imports.wbg.__wbindgen_bigint_from_u128 = function(arg0, arg1) {
    const ret = BigInt.asUintN(64, arg0) << BigInt(64) | BigInt.asUintN(64, arg1);
    return addHeapObject(ret);
  };
  imports.wbg.__wbindgen_bigint_from_u64 = function(arg0) {
    const ret = BigInt.asUintN(64, arg0);
    return addHeapObject(ret);
  };
  imports.wbg.__wbindgen_bigint_get_as_i64 = function(arg0, arg1) {
    const v = getObject(arg1);
    const ret = typeof v === "bigint" ? v : void 0;
    getDataViewMemory0().setBigInt64(arg0 + 8 * 1, isLikeNone(ret) ? BigInt(0) : ret, true);
    getDataViewMemory0().setInt32(arg0 + 4 * 0, !isLikeNone(ret), true);
  };
  imports.wbg.__wbindgen_boolean_get = function(arg0) {
    const v = getObject(arg0);
    const ret = typeof v === "boolean" ? v ? 1 : 0 : 2;
    return ret;
  };
  imports.wbg.__wbindgen_cb_drop = function(arg0) {
    const obj = takeObject(arg0).original;
    if (obj.cnt-- == 1) {
      obj.a = 0;
      return true;
    }
    const ret = false;
    return ret;
  };
  imports.wbg.__wbindgen_closure_wrapper4175 = function(arg0, arg1, arg2) {
    const ret = makeMutClosure(arg0, arg1, 155, __wbg_adapter_50);
    return addHeapObject(ret);
  };
  imports.wbg.__wbindgen_debug_string = function(arg0, arg1) {
    const ret = debugString(getObject(arg1));
    const ptr1 = passStringToWasm0(ret, wasm.__wbindgen_export_0, wasm.__wbindgen_export_1);
    const len1 = WASM_VECTOR_LEN;
    getDataViewMemory0().setInt32(arg0 + 4 * 1, len1, true);
    getDataViewMemory0().setInt32(arg0 + 4 * 0, ptr1, true);
  };
  imports.wbg.__wbindgen_error_new = function(arg0, arg1) {
    const ret = new Error(getStringFromWasm0(arg0, arg1));
    return addHeapObject(ret);
  };
  imports.wbg.__wbindgen_in = function(arg0, arg1) {
    const ret = getObject(arg0) in getObject(arg1);
    return ret;
  };
  imports.wbg.__wbindgen_is_bigint = function(arg0) {
    const ret = typeof getObject(arg0) === "bigint";
    return ret;
  };
  imports.wbg.__wbindgen_is_function = function(arg0) {
    const ret = typeof getObject(arg0) === "function";
    return ret;
  };
  imports.wbg.__wbindgen_is_object = function(arg0) {
    const val = getObject(arg0);
    const ret = typeof val === "object" && val !== null;
    return ret;
  };
  imports.wbg.__wbindgen_is_string = function(arg0) {
    const ret = typeof getObject(arg0) === "string";
    return ret;
  };
  imports.wbg.__wbindgen_is_undefined = function(arg0) {
    const ret = getObject(arg0) === void 0;
    return ret;
  };
  imports.wbg.__wbindgen_jsval_eq = function(arg0, arg1) {
    const ret = getObject(arg0) === getObject(arg1);
    return ret;
  };
  imports.wbg.__wbindgen_jsval_loose_eq = function(arg0, arg1) {
    const ret = getObject(arg0) == getObject(arg1);
    return ret;
  };
  imports.wbg.__wbindgen_memory = function() {
    const ret = wasm.memory;
    return addHeapObject(ret);
  };
  imports.wbg.__wbindgen_number_get = function(arg0, arg1) {
    const obj = getObject(arg1);
    const ret = typeof obj === "number" ? obj : void 0;
    getDataViewMemory0().setFloat64(arg0 + 8 * 1, isLikeNone(ret) ? 0 : ret, true);
    getDataViewMemory0().setInt32(arg0 + 4 * 0, !isLikeNone(ret), true);
  };
  imports.wbg.__wbindgen_number_new = function(arg0) {
    const ret = arg0;
    return addHeapObject(ret);
  };
  imports.wbg.__wbindgen_object_clone_ref = function(arg0) {
    const ret = getObject(arg0);
    return addHeapObject(ret);
  };
  imports.wbg.__wbindgen_object_drop_ref = function(arg0) {
    takeObject(arg0);
  };
  imports.wbg.__wbindgen_string_get = function(arg0, arg1) {
    const obj = getObject(arg1);
    const ret = typeof obj === "string" ? obj : void 0;
    var ptr1 = isLikeNone(ret) ? 0 : passStringToWasm0(ret, wasm.__wbindgen_export_0, wasm.__wbindgen_export_1);
    var len1 = WASM_VECTOR_LEN;
    getDataViewMemory0().setInt32(arg0 + 4 * 1, len1, true);
    getDataViewMemory0().setInt32(arg0 + 4 * 0, ptr1, true);
  };
  imports.wbg.__wbindgen_string_new = function(arg0, arg1) {
    const ret = getStringFromWasm0(arg0, arg1);
    return addHeapObject(ret);
  };
  imports.wbg.__wbindgen_throw = function(arg0, arg1) {
    throw new Error(getStringFromWasm0(arg0, arg1));
  };
  return imports;
}
function __wbg_init_memory(imports, memory) {
}
function __wbg_finalize_init(instance, module2) {
  wasm = instance.exports;
  __wbg_init.__wbindgen_wasm_module = module2;
  cachedDataViewMemory0 = null;
  cachedUint16ArrayMemory0 = null;
  cachedUint8ArrayMemory0 = null;
  return wasm;
}
function initSync(module2) {
  if (wasm !== void 0) return wasm;
  if (typeof module2 !== "undefined") {
    if (Object.getPrototypeOf(module2) === Object.prototype) {
      ({ module: module2 } = module2);
    } else {
      console.warn("using deprecated parameters for `initSync()`; pass a single object instead");
    }
  }
  const imports = __wbg_get_imports();
  __wbg_init_memory(imports);
  if (!(module2 instanceof WebAssembly.Module)) {
    module2 = new WebAssembly.Module(module2);
  }
  const instance = new WebAssembly.Instance(module2, imports);
  return __wbg_finalize_init(instance, module2);
}
async function __wbg_init(module_or_path) {
  if (wasm !== void 0) return wasm;
  if (typeof module_or_path !== "undefined") {
    if (Object.getPrototypeOf(module_or_path) === Object.prototype) {
      ({ module_or_path } = module_or_path);
    } else {
      console.warn("using deprecated parameters for the initialization function; pass a single object instead");
    }
  }
  if (typeof module_or_path === "undefined") {
    module_or_path = new URL("wasm_bg.wasm", __dirname.global.url);
  }
  const imports = __wbg_get_imports();
  if (typeof module_or_path === "string" || typeof Request === "function" && module_or_path instanceof Request || typeof URL === "function" && module_or_path instanceof URL) {
    module_or_path = fetch(module_or_path);
  }
  __wbg_init_memory(imports);
  const { instance, module: module2 } = await __wbg_load(await module_or_path, imports);
  return __wbg_finalize_init(instance, module2);
}
var wasm_default = __wbg_init;
