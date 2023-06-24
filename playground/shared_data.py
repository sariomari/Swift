ALL_TASKS = {
    "TLV": {
        "ZONE1": set(),
        "ZONE2": set(),
        "ZONE3": set(),
    },
    "NZRT": {
        "ZONE1": set(),
        "ZONE2": set(),
    },
    "KBL": {
        "ZONE1": set(),
    }
}

TLV_DRIVERS = {
    "ZONE1": {"tamerdamouni"},
    "ZONE2": {"weammakhoul"},
    "ZONE3": {"firasbaransi"},
}

TLV_ZONES = {
    "zone1Bounds": {
        "minLatitude": 32.100892,
        "maxLatitude": 32.125610,
        "minLongitude": 34.779642,
        "maxLongitude": 34.822070,
    },
    "zone2Bounds": {
        "minLatitude": 32.070986,
        "maxLatitude": 32.093474,
        "minLongitude": 32.070986,
        "maxLongitude": 34.819053,
    },
    "zone3Bounds": {
        "minLatitude": 32.04008,
        "maxLatitude": 32.068447,
        "minLongitude": 34.747435,
        "maxLongitude": 34.822338,
    }
}

NAZARETH_DRIVERS = {
    "ZONE1": [],
    "ZONE2": [],
}

NAZARETH_ZONES = {
    "zone1Bounds": {
        "minLatitude": 0,
        "maxLatitude": 0,
        "minLongitude": 0,
        "maxLongitude": 0,
    },
    "zone2Bounds": {
        "minLatitude": 0,
        "maxLatitude": 0,
        "minLongitude": 0,
        "maxLongitude": 0,
    }
}

KABUL_DRIVERS = {
    "ZONE1": [],
}

KABUL_ZONES = {
    "zone1Bounds": {
        "minLatitude": 0,
        "maxLatitude": 0,
        "minLongitude": 0,
        "maxLongitude": 0,
    },
}

CITY_INFORMATION_MAP = {
    "TLV": [TLV_DRIVERS, TLV_ZONES],
    "NZRT": [NAZARETH_DRIVERS, NAZARETH_ZONES],
    "KBL": [KABUL_DRIVERS, KABUL_ZONES],
}
