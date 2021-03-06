const data = [
  {
    id: 1,
    short: "AD",
    name: "安道尔共和国",
    en: "Andorra",
    tel: "376",
    pinyin: "adeghg",
  },
  {
    id: 2,
    short: "AE",
    name: "阿拉伯联合酋长国",
    en: "UnitedArabEmirates",
    tel: "971",
    pinyin: "alblhqzg",
  },
  {
    id: 3,
    short: "AF",
    name: "阿富汗",
    en: "Afghanistan",
    tel: "93",
    pinyin: "afh",
  },
  {
    id: 4,
    short: "AG",
    name: "安提瓜和巴布达",
    en: "AntiguaandBarbuda",
    tel: "1268",
    pinyin: "atghbbd",
  },
  {
    id: 5,
    short: "AI",
    name: "安圭拉岛",
    en: "Anguilla",
    tel: "1264",
    pinyin: "agld",
  },
  {
    id: 6,
    short: "AL",
    name: "阿尔巴尼亚",
    en: "Albania",
    tel: "355",
    pinyin: "aebny",
  },
  {
    id: 7,
    short: "AM",
    name: "阿美尼亚",
    en: "Armenia",
    tel: "374",
    pinyin: "amny",
  },
  {
    id: 8,
    short: "",
    name: "阿森松",
    en: "Ascension",
    tel: "247",
    pinyin: "als",
  },
  {
    id: 9,
    short: "AO",
    name: "安哥拉",
    en: "Angola",
    tel: "244",
    pinyin: "agl",
  },
  {
    id: 10,
    short: "AR",
    name: "阿根廷",
    en: "Argentina",
    tel: "54",
    pinyin: "agt",
  },
  {
    id: 11,
    short: "AT",
    name: "奥地利",
    en: "Austria",
    tel: "43",
    pinyin: "adl",
  },
  {
    id: 12,
    short: "AU",
    name: "澳大利亚",
    en: "Australia",
    tel: "61",
    pinyin: "adly",
  },
  {
    id: 13,
    short: "AZ",
    name: "阿塞拜疆",
    en: "Azerbaijan",
    tel: "994",
    pinyin: "asbj",
  },
  {
    id: 14,
    short: "BB",
    name: "巴巴多斯",
    en: "Barbados",
    tel: "1246",
    pinyin: "bbds",
  },
  {
    id: 15,
    short: "BD",
    name: "孟加拉国",
    en: "Bangladesh",
    tel: "880",
    pinyin: "mjlg",
  },
  {
    id: 16,
    short: "BE",
    name: "比利时",
    en: "Belgium",
    tel: "32",
    pinyin: "bls",
  },
  {
    id: 17,
    short: "BF",
    name: "布基纳法索",
    en: "Burkina-faso",
    tel: "226",
    pinyin: "bjnfs",
  },
  {
    id: 18,
    short: "BG",
    name: "保加利亚",
    en: "Bulgaria",
    tel: "359",
    pinyin: "bjly",
  },
  {
    id: 19,
    short: "BH",
    name: "巴林",
    en: "Bahrain",
    tel: "973",
    pinyin: "bl",
  },
  {
    id: 20,
    short: "BI",
    name: "布隆迪",
    en: "Burundi",
    tel: "257",
    pinyin: "bld",
  },
  {
    id: 21,
    short: "BJ",
    name: "贝宁",
    en: "Benin",
    tel: "229",
    pinyin: "bl",
  },
  {
    id: 22,
    short: "BL",
    name: "巴勒斯坦",
    en: "Palestine",
    tel: "970",
    pinyin: "blst",
  },
  {
    id: 23,
    short: "BM",
    name: "百慕大群岛",
    en: "BermudaIs.",
    tel: "1441",
    pinyin: "bmdqd",
  },
  {
    id: 24,
    short: "BN",
    name: "文莱",
    en: "Brunei",
    tel: "673",
    pinyin: "wl",
  },
  {
    id: 25,
    short: "BO",
    name: "玻利维亚",
    en: "Bolivia",
    tel: "591",
    pinyin: "blwy",
  },
  {
    id: 26,
    short: "BR",
    name: "巴西",
    en: "Brazil",
    tel: "55",
    pinyin: "bx",
  },
  {
    id: 27,
    short: "BS",
    name: "巴哈马",
    en: "Bahamas",
    tel: "1242",
    pinyin: "bhm",
  },
  {
    id: 28,
    short: "BW",
    name: "博茨瓦纳",
    en: "Botswana",
    tel: "267",
    pinyin: "bcwn",
  },
  {
    id: 29,
    short: "BY",
    name: "白俄罗斯",
    en: "Belarus",
    tel: "375",
    pinyin: "bels",
  },
  {
    id: 30,
    short: "BZ",
    name: "伯利兹",
    en: "Belize",
    tel: "501",
    pinyin: "blz",
  },
  {
    id: 31,
    short: "CA",
    name: "加拿大",
    en: "Canada",
    tel: "1",
    pinyin: "jnd",
  },
  {
    id: 32,
    short: "",
    name: "开曼群岛",
    en: "CaymanIs.",
    tel: "1345",
    pinyin: "kmqd",
  },
  {
    id: 33,
    short: "CF",
    name: "中非共和国",
    en: "CentralAfricanRepublic",
    tel: "236",
    pinyin: "zfghg",
  },
  {
    id: 34,
    short: "CG",
    name: "刚果",
    en: "Congo",
    tel: "242",
    pinyin: "gg",
  },
  {
    id: 35,
    short: "CH",
    name: "瑞士",
    en: "Switzerland",
    tel: "41",
    pinyin: "rs",
  },
  {
    id: 36,
    short: "CK",
    name: "库克群岛",
    en: "CookIs.",
    tel: "682",
    pinyin: "kkqd",
  },
  {
    id: 37,
    short: "CL",
    name: "智利",
    en: "Chile",
    tel: "56",
    pinyin: "zl",
  },
  {
    id: 38,
    short: "CM",
    name: "喀麦隆",
    en: "Cameroon",
    tel: "237",
    pinyin: "kml",
  },
  {
    id: 39,
    short: "CN",
    name: "中国",
    en: "China",
    tel: "86",
    pinyin: "zg",
  },
  {
    id: 40,
    short: "CO",
    name: "哥伦比亚",
    en: "Colombia",
    tel: "57",
    pinyin: "glby",
  },
  {
    id: 41,
    short: "CR",
    name: "哥斯达黎加",
    en: "CostaRica",
    tel: "506",
    pinyin: "gsdlj",
  },
  {
    id: 42,
    short: "CS",
    name: "捷克",
    en: "Czech",
    tel: "420",
    pinyin: "jk",
  },
  {
    id: 43,
    short: "CU",
    name: "古巴",
    en: "Cuba",
    tel: "53",
    pinyin: "gb",
  },
  {
    id: 44,
    short: "CY",
    name: "塞浦路斯",
    en: "Cyprus",
    tel: "357",
    pinyin: "spls",
  },
  {
    id: 45,
    short: "CZ",
    name: "捷克",
    en: "CzechRepublic",
    tel: "420",
    pinyin: "jk",
  },
  {
    id: 46,
    short: "DE",
    name: "德国",
    en: "Germany",
    tel: "49",
    pinyin: "dg",
  },
  {
    id: 47,
    short: "DJ",
    name: "吉布提",
    en: "Djibouti",
    tel: "253",
    pinyin: "jbt",
  },
  {
    id: 48,
    short: "DK",
    name: "丹麦",
    en: "Denmark",
    tel: "45",
    pinyin: "dm",
  },
  {
    id: 49,
    short: "DO",
    name: "多米尼加共和国",
    en: "DominicaRep.",
    tel: "1890",
    pinyin: "dmnjghg",
  },
  {
    id: 50,
    short: "DZ",
    name: "阿尔及利亚",
    en: "Algeria",
    tel: "213",
    pinyin: "aejly",
  },
  {
    id: 51,
    short: "EC",
    name: "厄瓜多尔",
    en: "Ecuador",
    tel: "593",
    pinyin: "egde",
  },
  {
    id: 52,
    short: "EE",
    name: "爱沙尼亚",
    en: "Estonia",
    tel: "372",
    pinyin: "asny",
  },
  {
    id: 53,
    short: "EG",
    name: "埃及",
    en: "Egypt",
    tel: "20",
    pinyin: "ej",
  },
  {
    id: 54,
    short: "ES",
    name: "西班牙",
    en: "Spain",
    tel: "34",
    pinyin: "xby",
  },
  {
    id: 55,
    short: "ET",
    name: "埃塞俄比亚",
    en: "Ethiopia",
    tel: "251",
    pinyin: "aseby",
  },
  {
    id: 56,
    short: "FI",
    name: "芬兰",
    en: "Finland",
    tel: "358",
    pinyin: "fl",
  },
  {
    id: 57,
    short: "FJ",
    name: "斐济",
    en: "Fiji",
    tel: "679",
    pinyin: "fj",
  },
  {
    id: 58,
    short: "FR",
    name: "法国",
    en: "France",
    tel: "33",
    pinyin: "fg",
  },
  {
    id: 59,
    short: "GA",
    name: "加蓬",
    en: "Gabon",
    tel: "241",
    pinyin: "jp",
  },
  {
    id: 60,
    short: "GB",
    name: "英国",
    en: "UnitedKiongdom",
    tel: "44",
    pinyin: "yg",
  },
  {
    id: 61,
    short: "GD",
    name: "格林纳达",
    en: "Grenada",
    tel: "1809",
    pinyin: "glnd",
  },
  {
    id: 62,
    short: "GE",
    name: "格鲁吉亚",
    en: "Georgia",
    tel: "995",
    pinyin: "gljy",
  },
  {
    id: 63,
    short: "GF",
    name: "法属圭亚那",
    en: "FrenchGuiana",
    tel: "594",
    pinyin: "fsgyn",
  },
  {
    id: 64,
    short: "GH",
    name: "加纳",
    en: "Ghana",
    tel: "233",
    pinyin: "jn",
  },
  {
    id: 65,
    short: "GI",
    name: "直布罗陀",
    en: "Gibraltar",
    tel: "350",
    pinyin: "zblt",
  },
  {
    id: 66,
    short: "GM",
    name: "冈比亚",
    en: "Gambia",
    tel: "220",
    pinyin: "gby",
  },
  {
    id: 67,
    short: "GN",
    name: "几内亚",
    en: "Guinea",
    tel: "224",
    pinyin: "jny",
  },
  {
    id: 68,
    short: "GR",
    name: "希腊",
    en: "Greece",
    tel: "30",
    pinyin: "xl",
  },
  {
    id: 69,
    short: "GT",
    name: "危地马拉",
    en: "Guatemala",
    tel: "502",
    pinyin: "wdml",
  },
  {
    id: 70,
    short: "GU",
    name: "关岛",
    en: "Guam",
    tel: "1671",
    pinyin: "gd",
  },
  {
    id: 71,
    short: "GY",
    name: "圭亚那",
    en: "Guyana",
    tel: "592",
    pinyin: "gyn",
  },
  {
    id: 72,
    short: "HK",
    name: "香港(中国)",
    en: "Hongkong",
    tel: "852",
    pinyin: "xgzg",
  },
  {
    id: 73,
    short: "HN",
    name: "洪都拉斯",
    en: "Honduras",
    tel: "504",
    pinyin: "hdls",
  },
  {
    id: 74,
    short: "HT",
    name: "海地",
    en: "Haiti",
    tel: "509",
    pinyin: "hd",
  },
  {
    id: 75,
    short: "HU",
    name: "匈牙利",
    en: "Hungary",
    tel: "36",
    pinyin: "xyl",
  },
  {
    id: 76,
    short: "ID",
    name: "印度尼西亚",
    en: "Indonesia",
    tel: "62",
    pinyin: "ydnxy",
  },
  {
    id: 77,
    short: "IE",
    name: "爱尔兰",
    en: "Ireland",
    tel: "353",
    pinyin: "ael",
  },
  {
    id: 78,
    short: "IL",
    name: "以色列",
    en: "Israel",
    tel: "972",
    pinyin: "ysl",
  },
  {
    id: 79,
    short: "IN",
    name: "印度",
    en: "India",
    tel: "91",
    pinyin: "yd",
  },
  {
    id: 80,
    short: "IQ",
    name: "伊拉克",
    en: "Iraq",
    tel: "964",
    pinyin: "ylk",
  },
  {
    id: 81,
    short: "IR",
    name: "伊朗",
    en: "Iran",
    tel: "98",
    pinyin: "yl",
  },
  {
    id: 82,
    short: "IS",
    name: "冰岛",
    en: "Iceland",
    tel: "354",
    pinyin: "bd",
  },
  {
    id: 83,
    short: "IT",
    name: "意大利",
    en: "Italy",
    tel: "39",
    pinyin: "ydl",
  },
  {
    id: 84,
    short: "",
    name: "科特迪瓦",
    en: "IvoryCoast",
    tel: "225",
    pinyin: "ktdw",
  },
  {
    id: 85,
    short: "JM",
    name: "牙买加",
    en: "Jamaica",
    tel: "1876",
    pinyin: "ymj",
  },
  {
    id: 86,
    short: "JO",
    name: "约旦",
    en: "Jordan",
    tel: "962",
    pinyin: "yd",
  },
  {
    id: 87,
    short: "JP",
    name: "日本",
    en: "Japan",
    tel: "81",
    pinyin: "rb",
  },
  {
    id: 88,
    short: "KE",
    name: "肯尼亚",
    en: "Kenya",
    tel: "254",
    pinyin: "kny",
  },
  {
    id: 89,
    short: "KG",
    name: "吉尔吉斯坦",
    en: "Kyrgyzstan",
    tel: "331",
    pinyin: "jejst",
  },
  {
    id: 90,
    short: "KH",
    name: "柬埔寨",
    en: "Kampuchea(Cambodia)",
    tel: "855",
    pinyin: "jpz",
  },
  {
    id: 91,
    short: "KP",
    name: "朝鲜",
    en: "NorthKorea",
    tel: "850",
    pinyin: "cx",
  },
  {
    id: 92,
    short: "KR",
    name: "韩国",
    en: "Korea",
    tel: "82",
    pinyin: "hg",
  },
  {
    id: 93,
    short: "KT",
    name: "科特迪瓦共和国",
    en: "RepublicofIvoryCoast",
    tel: "225",
    pinyin: "ktdwghg",
  },
  {
    id: 94,
    short: "KW",
    name: "科威特",
    en: "Kuwait",
    tel: "965",
    pinyin: "kwt",
  },
  {
    id: 95,
    short: "KZ",
    name: "哈萨克斯坦",
    en: "Kazakstan",
    tel: "327",
    pinyin: "hskst",
  },
  {
    id: 96,
    short: "LA",
    name: "老挝",
    en: "Laos",
    tel: "856",
    pinyin: "lw",
  },
  {
    id: 97,
    short: "LB",
    name: "黎巴嫩",
    en: "Lebanon",
    tel: "961",
    pinyin: "lbn",
  },
  {
    id: 98,
    short: "LC",
    name: "圣卢西亚",
    en: "St.Lucia",
    tel: "1758",
    pinyin: "slxy",
  },
  {
    id: 99,
    short: "LI",
    name: "列支敦士登",
    en: "Liechtenstein",
    tel: "423",
    pinyin: "lzdsd",
  },
  {
    id: 100,
    short: "LK",
    name: "斯里兰卡",
    en: "SriLanka",
    tel: "94",
    pinyin: "sllk",
  },
  {
    id: 101,
    short: "LR",
    name: "利比里亚",
    en: "Liberia",
    tel: "231",
    pinyin: "lbly",
  },
  {
    id: 102,
    short: "LS",
    name: "莱索托",
    en: "Lesotho",
    tel: "266",
    pinyin: "lst",
  },
  {
    id: 103,
    short: "LT",
    name: "立陶宛",
    en: "Lithuania",
    tel: "370",
    pinyin: "ltw",
  },
  {
    id: 104,
    short: "LU",
    name: "卢森堡",
    en: "Luxembourg",
    tel: "352",
    pinyin: "lsb",
  },
  {
    id: 105,
    short: "LV",
    name: "拉脱维亚",
    en: "Latvia",
    tel: "371",
    pinyin: "ltwy",
  },
  {
    id: 106,
    short: "LY",
    name: "利比亚",
    en: "Libya",
    tel: "218",
    pinyin: "lby",
  },
  {
    id: 107,
    short: "MA",
    name: "摩洛哥",
    en: "Morocco",
    tel: "212",
    pinyin: "mlg",
  },
  {
    id: 108,
    short: "MC",
    name: "摩纳哥",
    en: "Monaco",
    tel: "377",
    pinyin: "mng",
  },
  {
    id: 109,
    short: "MD",
    name: "摩尔多瓦",
    en: "Moldova,Republicof",
    tel: "373",
    pinyin: "medw",
  },
  {
    id: 110,
    short: "MG",
    name: "马达加斯加",
    en: "Madagascar",
    tel: "261",
    pinyin: "mdjsj",
  },
  {
    id: 111,
    short: "ML",
    name: "马里",
    en: "Mali",
    tel: "223",
    pinyin: "ml",
  },
  {
    id: 112,
    short: "MM",
    name: "缅甸",
    en: "Burma",
    tel: "95",
    pinyin: "md",
  },
  {
    id: 113,
    short: "MN",
    name: "蒙古",
    en: "Mongolia",
    tel: "976",
    pinyin: "mg",
  },
  {
    id: 114,
    short: "MO",
    name: "澳门（中国）",
    en: "Macao",
    tel: "853",
    pinyin: "am zg",
  },
  {
    id: 115,
    short: "MS",
    name: "蒙特塞拉特岛",
    en: "MontserratIs",
    tel: "1664",
    pinyin: "mtsstd",
  },
  {
    id: 116,
    short: "MT",
    name: "马耳他",
    en: "Malta",
    tel: "356",
    pinyin: "met",
  },
  {
    id: 117,
    short: "",
    name: "马里亚那群岛",
    en: "MarianaIs",
    tel: "1670",
    pinyin: "mlynqd",
  },
  {
    id: 118,
    short: "",
    name: "马提尼克",
    en: "Martinique",
    tel: "596",
    pinyin: "mtnk",
  },
  {
    id: 119,
    short: "MU",
    name: "毛里求斯",
    en: "Mauritius",
    tel: "230",
    pinyin: "mlqs",
  },
  {
    id: 120,
    short: "MV",
    name: "马尔代夫",
    en: "Maldives",
    tel: "960",
    pinyin: "medf",
  },
  {
    id: 121,
    short: "MW",
    name: "马拉维",
    en: "Malawi",
    tel: "265",
    pinyin: "mlw",
  },
  {
    id: 122,
    short: "MX",
    name: "墨西哥",
    en: "Mexico",
    tel: "52",
    pinyin: "mxg",
  },
  {
    id: 123,
    short: "MY",
    name: "马来西亚",
    en: "Malaysia",
    tel: "60",
    pinyin: "mlxy",
  },
  {
    id: 124,
    short: "MZ",
    name: "莫桑比克",
    en: "Mozambique",
    tel: "258",
    pinyin: "msbk",
  },
  {
    id: 125,
    short: "NA",
    name: "纳米比亚",
    en: "Namibia",
    tel: "264",
    pinyin: "nmby",
  },
  {
    id: 126,
    short: "NE",
    name: "尼日尔",
    en: "Niger",
    tel: "977",
    pinyin: "nre",
  },
  {
    id: 127,
    short: "NG",
    name: "尼日利亚",
    en: "Nigeria",
    tel: "234",
    pinyin: "nrly",
  },
  {
    id: 128,
    short: "NI",
    name: "尼加拉瓜",
    en: "Nicaragua",
    tel: "505",
    pinyin: "njlg",
  },
  {
    id: 129,
    short: "NL",
    name: "荷兰",
    en: "Netherlands",
    tel: "31",
    pinyin: "hl",
  },
  {
    id: 130,
    short: "NO",
    name: "挪威",
    en: "Norway",
    tel: "47",
    pinyin: "nw",
  },
  {
    id: 131,
    short: "NP",
    name: "尼泊尔",
    en: "Nepal",
    tel: "977",
    pinyin: "nbe",
  },
  {
    id: 132,
    short: "",
    name: "荷属安的列斯",
    en: "NetheriandsAntilles",
    tel: "599",
    pinyin: "hsadls",
  },
  {
    id: 133,
    short: "NR",
    name: "瑙鲁",
    en: "Nauru",
    tel: "674",
    pinyin: "nl",
  },
  {
    id: 134,
    short: "NZ",
    name: "新西兰",
    en: "NewZealand",
    tel: "64",
    pinyin: "xxl",
  },
  {
    id: 135,
    short: "OM",
    name: "阿曼",
    en: "Oman",
    tel: "968",
    pinyin: "am",
  },
  {
    id: 136,
    short: "PA",
    name: "巴拿马",
    en: "Panama",
    tel: "507",
    pinyin: "bnm",
  },
  {
    id: 137,
    short: "PE",
    name: "秘鲁",
    en: "Peru",
    tel: "51",
    pinyin: "bl",
  },
  {
    id: 138,
    short: "PF",
    name: "法属玻利尼西亚",
    en: "FrenchPolynesia",
    tel: "689",
    pinyin: "fsblnxy",
  },
  {
    id: 139,
    short: "PG",
    name: "巴布亚新几内亚",
    en: "PapuaNewCuinea",
    tel: "675",
    pinyin: "bbyxjny",
  },
  {
    id: 140,
    short: "PH",
    name: "菲律宾",
    en: "Philippines",
    tel: "63",
    pinyin: "flb",
  },
  {
    id: 141,
    short: "PK",
    name: "巴基斯坦",
    en: "Pakistan",
    tel: "92",
    pinyin: "bjst",
  },
  {
    id: 142,
    short: "PL",
    name: "波兰",
    en: "Poland",
    tel: "48",
    pinyin: "bl",
  },
  {
    id: 143,
    short: "PR",
    name: "波多黎各",
    en: "PuertoRico",
    tel: "1787",
    pinyin: "bdlg",
  },
  {
    id: 144,
    short: "PT",
    name: "葡萄牙",
    en: "Portugal",
    tel: "351",
    pinyin: "pty",
  },
  {
    id: 145,
    short: "PY",
    name: "巴拉圭",
    en: "Paraguay",
    tel: "595",
    pinyin: "blg",
  },
  {
    id: 146,
    short: "QA",
    name: "卡塔尔",
    en: "Qatar",
    tel: "974",
    pinyin: "kte",
  },
  {
    id: 147,
    short: "",
    name: "留尼旺",
    en: "Reunion",
    tel: "262",
    pinyin: "lnw",
  },
  {
    id: 148,
    short: "RO",
    name: "罗马尼亚",
    en: "Romania",
    tel: "40",
    pinyin: "lmny",
  },
  {
    id: 149,
    short: "RU",
    name: "俄罗斯",
    en: "Russia",
    tel: "7",
    pinyin: "els",
  },
  {
    id: 150,
    short: "SA",
    name: "沙特阿拉伯",
    en: "SaudiArabia",
    tel: "966",
    pinyin: "stalb",
  },
  {
    id: 151,
    short: "SB",
    name: "所罗门群岛",
    en: "SolomonIs",
    tel: "677",
    pinyin: "slmqd",
  },
  {
    id: 152,
    short: "SC",
    name: "塞舌尔",
    en: "Seychelles",
    tel: "248",
    pinyin: "sse",
  },
  {
    id: 153,
    short: "SD",
    name: "苏丹",
    en: "Sudan",
    tel: "249",
    pinyin: "sd",
  },
  {
    id: 154,
    short: "SE",
    name: "瑞典",
    en: "Sweden",
    tel: "46",
    pinyin: "rd",
  },
  {
    id: 155,
    short: "SG",
    name: "新加坡",
    en: "Singapore",
    tel: "65",
    pinyin: "xjp",
  },
  {
    id: 156,
    short: "SI",
    name: "斯洛文尼亚",
    en: "Slovenia",
    tel: "386",
    pinyin: "slwny",
  },
  {
    id: 157,
    short: "SK",
    name: "斯洛伐克",
    en: "Slovakia",
    tel: "421",
    pinyin: "slfk",
  },
  {
    id: 158,
    short: "SL",
    name: "塞拉利昂",
    en: "SierraLeone",
    tel: "232",
    pinyin: "slla",
  },
  {
    id: 159,
    short: "SM",
    name: "圣马力诺",
    en: "SanMarino",
    tel: "378",
    pinyin: "smln",
  },
  {
    id: 160,
    short: "",
    name: "东萨摩亚(美)",
    en: "SamoaEastern",
    tel: "684",
    pinyin: "dsmym",
  },
  {
    id: 161,
    short: "",
    name: "西萨摩亚",
    en: "SanMarino",
    tel: "685",
    pinyin: "xsmy",
  },
  {
    id: 162,
    short: "SN",
    name: "塞内加尔",
    en: "Senegal",
    tel: "221",
    pinyin: "snje",
  },
  {
    id: 163,
    short: "SO",
    name: "索马里",
    en: "Somali",
    tel: "252",
    pinyin: "sml",
  },
  {
    id: 164,
    short: "SR",
    name: "苏里南",
    en: "Suriname",
    tel: "597",
    pinyin: "sln",
  },
  {
    id: 165,
    short: "ST",
    name: "圣多美和普林西比",
    en: "SaoTomeandPrincipe",
    tel: "239",
    pinyin: "sdmhplxb",
  },
  {
    id: 166,
    short: "SV",
    name: "萨尔瓦多",
    en: "EISalvador",
    tel: "503",
    pinyin: "sewd",
  },
  {
    id: 167,
    short: "SY",
    name: "叙利亚",
    en: "Syria",
    tel: "963",
    pinyin: "xly",
  },
  {
    id: 168,
    short: "SZ",
    name: "斯威士兰",
    en: "Swaziland",
    tel: "268",
    pinyin: "swsl",
  },
  {
    id: 169,
    short: "TD",
    name: "乍得",
    en: "Chad",
    tel: "235",
    pinyin: "zd",
  },
  {
    id: 170,
    short: "TG",
    name: "多哥",
    en: "Togo",
    tel: "228",
    pinyin: "dg",
  },
  {
    id: 171,
    short: "TH",
    name: "泰国",
    en: "Thailand",
    tel: "66",
    pinyin: "tg",
  },
  {
    id: 172,
    short: "TJ",
    name: "塔吉克斯坦",
    en: "Tajikstan",
    tel: "992",
    pinyin: "tjkst",
  },
  {
    id: 173,
    short: "TM",
    name: "土库曼斯坦",
    en: "Turkmenistan",
    tel: "993",
    pinyin: "tkmst",
  },
  {
    id: 174,
    short: "TN",
    name: "突尼斯",
    en: "Tunisia",
    tel: "216",
    pinyin: "tns",
  },
  {
    id: 175,
    short: "TO",
    name: "汤加",
    en: "Tonga",
    tel: "676",
    pinyin: "tj",
  },
  {
    id: 176,
    short: "TR",
    name: "土耳其",
    en: "Turkey",
    tel: "90",
    pinyin: "teq",
  },
  {
    id: 177,
    short: "TT",
    name: "特立尼达和多巴哥",
    en: "TrinidadandTobago",
    tel: "1809",
    pinyin: "tlndhdbg",
  },
  {
    id: 178,
    short: "TW",
    name: "台湾（中国）",
    en: "Taiwan",
    tel: "886",
    pinyin: "twzg",
  },
  {
    id: 179,
    short: "TZ",
    name: "坦桑尼亚",
    en: "Tanzania",
    tel: "255",
    pinyin: "tsny",
  },
  {
    id: 180,
    short: "UA",
    name: "乌克兰",
    en: "Ukraine",
    tel: "380",
    pinyin: "wkl",
  },
  {
    id: 181,
    short: "UG",
    name: "乌干达",
    en: "Uganda",
    tel: "256",
    pinyin: "wgd",
  },
  {
    id: 182,
    short: "US",
    name: "美国",
    en: "UnitedStatesofAmerica",
    tel: "1",
    pinyin: "mg",
  },
  {
    id: 183,
    short: "UY",
    name: "乌拉圭",
    en: "Uruguay",
    tel: "598",
    pinyin: "wlg",
  },
  {
    id: 184,
    short: "UZ",
    name: "乌兹别克斯坦",
    en: "Uzbekistan",
    tel: "233",
    pinyin: "wzbkst",
  },
  {
    id: 185,
    short: "VC",
    name: "圣文森特岛",
    en: "SaintVincent",
    tel: "1784",
    pinyin: "swstd",
  },
  {
    id: 186,
    short: "VE",
    name: "委内瑞拉",
    en: "Venezuela",
    tel: "58",
    pinyin: "wnrl",
  },
  {
    id: 187,
    short: "VN",
    name: "越南",
    en: "Vietnam",
    tel: "84",
    pinyin: "yn",
  },
  {
    id: 188,
    short: "YE",
    name: "也门",
    en: "Yemen",
    tel: "967",
    pinyin: "ym",
  },
  {
    id: 189,
    short: "YU",
    name: "南斯拉夫",
    en: "Yugoslavia",
    tel: "381",
    pinyin: "nslf",
  },
  {
    id: 190,
    short: "ZA",
    name: "南非",
    en: "SouthAfrica",
    tel: "27",
    pinyin: "nf",
  },
  {
    id: 191,
    short: "ZM",
    name: "赞比亚",
    en: "Zambia",
    tel: "260",
    pinyin: "zby",
  },
  {
    id: 192,
    short: "ZR",
    name: "扎伊尔",
    en: "Zaire",
    tel: "243",
    pinyin: "zye",
  },
  {
    id: 193,
    short: "ZW",
    name: "津巴布韦",
    en: "Zimbabwe",
    tel: "263",
    pinyin: "jbbw",
  },
];
export default {
  data,
};
