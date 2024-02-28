(function () {
    var myConnector = tableau.makeConnector();

  // Init function for connector, called during every phase
  myConnector.init = function(initCallback) {
      tableau.authType = tableau.authTypeEnum.basic;

      console.log("init: ", tableau.phase, tableau.username, tableau.password);
      if (tableau.phase == tableau.phaseEnum.gatherDataPhase) {
          var dateObj = JSON.parse(tableau.connectionData)
          // Run API tokens to log in and get token for the rest of the commands
          var url = "https://sentrylink.mpspark.com/api/v1/tokens.json"
          var xhr = new XMLHttpRequest();
          xhr.open("POST", url, false);

          xhr.setRequestHeader("Content-Type", "application/json");

          var data = '{"user" : {"email":"' + tableau.username + '" , "password":"' + tableau.password + '" }}';

          xhr.send(data);

          var jsonResponse = JSON.parse(xhr.responseText);

          tableau.password = jsonResponse.token;
          console.log("init: Token password obtained");
      }
      initCallback();
  }

myConnector.getSchema = function (schemaCallback) {
    var kiosks_cols = [{
        id: "name",
        alias: "name",
        dataType: tableau.dataTypeEnum.string
    }, {
        id: "latitude",
        alias: "latitude",
        dataType: tableau.dataTypeEnum.float
    }, {
        id: "longitude",
        alias: "longitude",
        dataType: tableau.dataTypeEnum.float
    }, {
        id: "address",
        alias: "address",
        dataType: tableau.dataTypeEnum.string
    }, {
        id: "city",
        alias: "city",
        dataType: tableau.dataTypeEnum.string
    }, {
        id: "state",
        alias: "state",
        dataType: tableau.dataTypeEnum.string
    }, {
        id: "spaces",
        alias: "spaces",
        dataType: tableau.dataTypeEnum.int
    }, {
        id: "available",
        alias: "available",
        dataType: tableau.dataTypeEnum.int
    } ];

    var kioskTable = {
        id: "kiosks",
        alias: "kiosks",
        columns: kiosks_cols
    };

    var vacancy_cols = [{
        id: "today_sessions",
        alias: "today_sessions",
        dataType: tableau.dataTypeEnum.int
    }, {
        id: "current_vacancy_value",
        alias: "current_vacancy_value",
        dataType: tableau.dataTypeEnum.float
    }, {
        id: "current_length_of_stay_value",
        alias: "current_length_of_stay_value",
        dataType: tableau.dataTypeEnum.float
    }, {
        id: "current_daily_enforced_parking_turns",
        alias: "current_daily_enforced_parking_turns",
        dataType: tableau.dataTypeEnum.float
    }, {
        id: "spots_available",
        alias: "spots_available",
        dataType: tableau.dataTypeEnum.int
    }, {
        id: "total_spots",
        alias: "total_spots",
        dataType: tableau.dataTypeEnum.int
    }, {
        id: "maintenance_mode",
        alias: "maintenance_mode",
        dataType: tableau.dataTypeEnum.int
    } ];

    var vacancyTable = {
        id: "spot_vacancy",
        alias: "spot_vacancy",
        columns: vacancy_cols
    };

    var spots_cols = [{
        id: "name",
        alias: "name",
        dataType: tableau.dataTypeEnum.string
    }, {
        id: "full_name",
        alias: "full_name",
        dataType: tableau.dataTypeEnum.string
    }, {
        id: "legacy_spot_id",
        alias: "legacy_spot_id",
        dataType: tableau.dataTypeEnum.int
    }, {
        id: "latitude",
        alias: "latitude",
        dataType: tableau.dataTypeEnum.float
    }, {
        id: "longitude",
        alias: "longitude",
        dataType: tableau.dataTypeEnum.float
    }, {
        id: "available",
        alias: "available",
        dataType: tableau.dataTypeEnum.bool
    }, {
        id: "device_id",
        alias: "device_id",
        dataType: tableau.dataTypeEnum.int
    } ];

    var spotsTable = {
        id: "spots",
        alias: "spots",
        columns: spots_cols
    };

    var meters_cols = [{
        id: "id",
        alias: "id",
        dataType: tableau.dataTypeEnum.int
    }, {
        id: "friendly_name",
        alias: "friendly_name",
        dataType: tableau.dataTypeEnum.string
    }, {
        id: "friendly_type",
        alias: "friendly_type",
        dataType: tableau.dataTypeEnum.string
    }, {
        id: "latitude",
        alias: "latitude",
        dataType: tableau.dataTypeEnum.float
    }, {
        id: "longitude",
        alias: "longitude",
        dataType: tableau.dataTypeEnum.float
    }, {
        id: "meter_group_id",
        alias: "meter_group_id",
        dataType: tableau.dataTypeEnum.int
    }, {
        id: "meter_group_name",
        alias: "meter_group_name",
        dataType: tableau.dataTypeEnum.string
    }, {
        id: "meter_capacity",
        alias: "meter_group_capacity",
        dataType: tableau.dataTypeEnum.int
    }, {
        id: "spots_available",
        alias: "spots_available",
        dataType: tableau.dataTypeEnum.int
    }, {
        id: "maintenance_mode",
        alias: "maintenance_mode",
        dataType: tableau.dataTypeEnum.bool
    }  ];

    var metersTable = {
        id: "meters",
        alias: "meters",
        columns: meters_cols
    };

    var current_sessions_cols = [{
        id: "id",
        alias: "id",
        dataType: tableau.dataTypeEnum.int
    }, {
        id: "name",
        alias: "name",
        dataType: tableau.dataTypeEnum.string
    }, {
        id: "estimated_time_remaining",
        alias: "estimated_time_remaining",
        dataType: tableau.dataTypeEnum.int
    }, {
        id: "free_time_remaining",
        alias: "free_time_remaining",
        dataType: tableau.dataTypeEnum.int
    }, {
        id: "violations",
        alias: "violations",
        dataType: tableau.dataTypeEnum.int
    }, {
        id: "payments",
        alias: "payments",
        dataType: tableau.dataTypeEnum.int
    }, {
        id: "park_timestamp",
        alias: "park_timestamp",
        dataType: tableau.dataTypeEnum.string
    }, {
        id: "camera_url",
        alias: "camera_url",
        dataType: tableau.dataTypeEnum.string
    } ];

    var currentSessionsTable = {
        id: "current_sessions",
        alias: "current_sessions",
        columns: current_sessions_cols
    };

    var vio_cols = [{
        id: "friendly_name",
        alias: "friendly_name",
        dataType: tableau.dataTypeEnum.string
    }, {
        id: "violations",
        alias: "violations",
        dataType: tableau.dataTypeEnum.int
    } ];

    var vioTable = {
        id: "device_hourly_violations",
        alias: "device_hourly_violations",
        columns: vio_cols
    };

    var cols = [{
        id: "date",
        alias: "date",
        dataType: tableau.dataTypeEnum.date
    }, {
        id: "compliance",
        alias: "compliance",
        dataType: tableau.dataTypeEnum.float
    }, {
        id: "violation",
        alias: "violation",
        dataType: tableau.dataTypeEnum.int
    } ];

    var tableSchema = {
        id: "violation_v_compliance",
        alias: "violation_v_compliance",
        columns: cols
    };

    var hourly_sessions_cols = [{
        id: "time",
        alias: "time",
        dataType: tableau.dataTypeEnum.string
    },{
        id: "scaled",
        alias: "scaled",
        dataType: tableau.dataTypeEnum.float
    }, {
        id: "raw",
        alias: "raw",
        dataType: tableau.dataTypeEnum.int
    } ];

    var hourlySessionsTable = {
        id: "hourly_parking_sessions",
        alias: "hourly_parking_sessions",
        columns: hourly_sessions_cols
    };
        
    var daily_sessions_cols = [{
        id: "date",
        alias: "date",
        dataType: tableau.dataTypeEnum.date
    },{
        id: "scaled",
        alias: "scaled",
        dataType: tableau.dataTypeEnum.float
    }, {
        id: "raw",
        alias: "raw",
        dataType: tableau.dataTypeEnum.int
    } ];

    var dailySessionsTable = {
        id: "daily_parking_sessions",
        alias: "daily_parking_sessions",
        columns: daily_sessions_cols
    };

    var daily_revenue_cols = [{
        id: "date",
        alias: "date",
        dataType: tableau.dataTypeEnum.date
    },{
        id: "scaled",
        alias: "scaled",
        dataType: tableau.dataTypeEnum.float
    }, {
        id: "raw",
        alias: "raw",
        dataType: tableau.dataTypeEnum.int
    } ];

    var dailyRevenueTable = {
        id: "daily_revenue",
        alias: "daily_revenue",
        columns: daily_revenue_cols
    };

    var daily_revenue_card_cols = [{
        id: "date",
        alias: "date",
        dataType: tableau.dataTypeEnum.date
    },{
        id: "scaled",
        alias: "scaled",
        dataType: tableau.dataTypeEnum.float
    }, {
        id: "raw",
        alias: "raw",
        dataType: tableau.dataTypeEnum.int
    } ];

    var dailyRevenueCardTable = {
        id: "daily_revenue_card",
        alias: "daily_revenue_card",
        columns: daily_revenue_card_cols
    };

    var daily_revenue_coin_cols = [{
        id: "date",
        alias: "date",
        dataType: tableau.dataTypeEnum.date
    },{
        id: "scaled",
        alias: "scaled",
        dataType: tableau.dataTypeEnum.float
    }, {
        id: "raw",
        alias: "raw",
        dataType: tableau.dataTypeEnum.int
    } ];

    var dailyRevenueCoinTable = {
        id: "daily_revenue_coin",
        alias: "daily_revenue_coin",
        columns: daily_revenue_coin_cols
    };

    var daily_violation_issued_revenue_cols = [{
        id: "date",
        alias: "date",
        dataType: tableau.dataTypeEnum.date
    },{
        id: "scaled",
        alias: "scaled",
        dataType: tableau.dataTypeEnum.float
    }, {
        id: "raw",
        alias: "raw",
        dataType: tableau.dataTypeEnum.int
    } ];

    var dailyViolationIssuedRevenueTable = {
        id: "daily_violation_issued_revenue",
        alias: "daily_violation_issued_revenue",
        columns: daily_violation_issued_revenue_cols
    };

    var coin_jar_status_report_cols = [{
        id: "id",
        alias: "id",
        dataType: tableau.dataTypeEnum.int
    },{
        id: "friendly_name",
        alias: "friendly_name",
        dataType: tableau.dataTypeEnum.string
    },{
        id: "device_type",
        alias: "device_type",
        dataType: tableau.dataTypeEnum.string
    },{
        id: "coin_jar_percent_full",
        alias: "coin_jar_percent_full",
        dataType: tableau.dataTypeEnum.float
    },{
        id: "coin_jar_coin_count",
        alias: "coin_jar_coin_count",
        dataType: tableau.dataTypeEnum.int
    },{
        id: "coin_jar_current_value",
        alias: "coin_jar_current_value",
        dataType: tableau.dataTypeEnum.int
    },{
        id: "coin_jar_coins",
        alias: "coin_jar_coins",
        dataType: tableau.dataTypeEnum.string
    },{
        id: "coin_jar_last_harvest_datetime",
        alias: "coin_jar_last_harvest_datetime",
        dataType: tableau.dataTypeEnum.datetime
    },{
        id: "coin_jar_last_harvest_value",
        alias: "coin_jar_last_harvest_value",
        dataType: tableau.dataTypeEnum.int
    },{
        id: "coin_jar_last_update",
        alias: "coin_jar_last_update",
        dataType: tableau.dataTypeEnum.datetime
    },{
        id: "average_cash_out_percent_full",
        alias: "average_cash_out_percent_full",
        dataType: tableau.dataTypeEnum.float
    },{
        id: "average_cash_out_coin_count",
        alias: "average_cash_out_coin_count",
        dataType: tableau.dataTypeEnum.float
    },{
        id: "average_cash_out_value",
        alias: "average_cash_out_value",
        dataType: tableau.dataTypeEnum.float
    },{
        id: "average_cash_out_jar_age_hours",
        alias: "average_cash_out_jar_age_hours",
        dataType: tableau.dataTypeEnum.float
    },{
        id: "num_cash_outs",
        alias: "num_cash_outs",
        dataType: tableau.dataTypeEnum.int
    },{
        id: "coin_vault_door_last_update",
        alias: "coin_vault_door_last_update",
        dataType: tableau.dataTypeEnum.datetime
    },{
        id: "address",
        alias: "address",
        dataType: tableau.dataTypeEnum.string
    },{
        id: "latitude",
        alias: "latitude",
        dataType: tableau.dataTypeEnum.float
    },{
        id: "longitude",
        alias: "longitude",
        dataType: tableau.dataTypeEnum.float
    } ];

    var coinJarStatusReportTable = {
        id: "coin_jar_status_report",
        alias: "coin_jar_status_report",
        columns: coin_jar_status_report_cols
    };

    var violation_quick_stats_cols = [{
        id: "date",
        alias: "date",
        dataType: tableau.dataTypeEnum.date
    },{
        id: "total_violations",
        alias: "total_violations",
        dataType: tableau.dataTypeEnum.int
    }, {
        id: "total_rejected",
        alias: "total_rejected",
        dataType: tableau.dataTypeEnum.int
    }, {
        id: "coin_error",
        alias: "coin_error",
        dataType: tableau.dataTypeEnum.int
    }, {
        id: "no_violation_pictures_with_vehicle",
        alias: "no_violation_pictures_with_vehicle",
        dataType: tableau.dataTypeEnum.int
    }, {
        id: "no_entrance_pictures_with_vehicle",
        alias: "no_entrance_pictures_with_vehicle",
        dataType: tableau.dataTypeEnum.int
    }, {
        id: "other",
        alias: "other",
        dataType: tableau.dataTypeEnum.int
    }, {
        id: "no_movement",
        alias: "no_movement",
        dataType: tableau.dataTypeEnum.int
    }, {
        id: "mismatched_vehicles",
        alias: "mismatched_vehicles",
        dataType: tableau.dataTypeEnum.int
    }, {
        id: "missing_pictures",
        alias: "missing_pictures",
        dataType: tableau.dataTypeEnum.int
    }];

    var violation_quick_statsTable = {
        id: "violation_quick_stats",
        alias: "violation_quick_stats",
        columns: violation_quick_stats_cols
    };

    schemaCallback([kioskTable, vacancyTable, currentSessionsTable, tableSchema, hourlySessionsTable, dailySessionsTable, dailyRevenueTable, dailyRevenueCardTable, dailyRevenueCoinTable, dailyViolationIssuedRevenueTable, violation_quick_statsTable, coinJarStatusReportTable, spotsTable, metersTable, vioTable]);
};

myConnector.getData = function(table, doneCallback) {
    var tmpObj = JSON.parse(tableau.connectionData)
    console.log("getData: ", table.tableInfo.id, tmpObj.submuni);
    if (table.tableInfo.id == "spot_vacancy") {
        var dateObj = JSON.parse(tableau.connectionData)
        var url = "https://" + dateObj.submuni + ".mpspark.com/api/v1/quickstat/daily_parking_sessions.json";

        var xhr = new XMLHttpRequest();
        xhr.open("POST", url, false);

        xhr.setRequestHeader("Content-Type", "application/json");
        xhr.setRequestHeader("X-User-Token", tableau.password);
        xhr.setRequestHeader("X-User-Email", tableau.username);

        xhr.onreadystatechange = function () {
            if (xhr.readyState === 4) {
                console.log(xhr.status);
                //console.log(xhr.responseText);
            }
        };

        var data = '{"desired_history":"1"}';

        xhr.send(data);

        var jsonResponse = JSON.parse(xhr.responseText);
        var quickstat = jsonResponse.quickstat;
        var today_sessions = quickstat.current_value;

        var url = "https://" + dateObj.submuni + ".mpspark.com/api/v1/quickstat/daily_length_of_stay.json";
        // var url = "https://hamtramckmi.mpspark.com/api/v1/quickstat/violation_v_compliance.json";

        xhr = new XMLHttpRequest();
        xhr.open("POST", url, false);

        xhr.setRequestHeader("Content-Type", "application/json");
        xhr.setRequestHeader("X-User-Token", tableau.password);
        xhr.setRequestHeader("X-User-Email", tableau.username);

        xhr.onreadystatechange = function () {
            if (xhr.readyState === 4) {
                console.log(xhr.status);
                //console.log(xhr.responseText);
            }
        };

        data = '{"desired_history":"1"}';

        xhr.send(data);

        jsonResponse = JSON.parse(xhr.responseText);
        quickstat = jsonResponse.quickstat;
        var current_length = quickstat.current_value/60.0;

        var url = "https://" + dateObj.submuni + ".mpspark.com/api/v1/quickstat/daily_enforced_parking_turns.json";

        xhr = new XMLHttpRequest();
        xhr.open("POST", url, false);

        xhr.setRequestHeader("Content-Type", "application/json");
        xhr.setRequestHeader("X-User-Token", tableau.password);
        xhr.setRequestHeader("X-User-Email", tableau.username);

        xhr.onreadystatechange = function () {
            if (xhr.readyState === 4) {
                console.log(xhr.status);
                //console.log(xhr.responseText);
            }
        };

        data = '{"desired_history":"1"}';

        xhr.send(data);

        jsonResponse = JSON.parse(xhr.responseText);
        quickstat = jsonResponse.quickstat;
        var current_turns = quickstat.current_value;

        var url = "https://" + dateObj.submuni + ".mpspark.com/api/v1/meters.json";

        var xhr = new XMLHttpRequest();
        xhr.open("GET", url, false);

        xhr.setRequestHeader("Content-Type", "application/json");
        xhr.setRequestHeader("X-User-Token", tableau.password);
        xhr.setRequestHeader("X-User-Email", tableau.username);

        xhr.onreadystatechange = function () {
            if (xhr.readyState === 4) {
                console.log(xhr.status);
                //console.log(xhr.responseText);
            }
        };

        xhr.send();

        var jsonResponse = JSON.parse(xhr.responseText);
        var meter_groups = jsonResponse.meter_groups;
        var total_spots = 0;
        var total_available = 0;
        var maintenance_mode = 0;
        // Iterate over the JSON object
        for (var i = 0, groups_len = meter_groups.length; i < groups_len; i++) {
            var meters = meter_groups[i].meters;
            for (var j = 0, meters_len = meters.length; j < meters_len; j++) {
                if(meters[j].maintenance_mode == true) {
                    maintenance_mode += 1;
                }
                var spots = meters[j].spots;
                for (var k = 0, spots_len = spots.length; k < spots_len; k++) {
                    if (spots[k].available == true) {
                        total_available += 1;
                    }
                    total_spots += 1;
                }
            }
        }

        var tableData = [];
        tableData.push({
            "today_sessions": today_sessions,
            "current_vacancy_value": (total_available/total_spots)*100.0,
            "current_length_of_stay_value": current_length,
            "current_daily_enforced_parking_turns": current_turns,
            "spots_available": total_available,
            "total_spots": total_spots,
            "maintenance_mode": maintenance_mode,
        });
    }

    if (table.tableInfo.id == "violation_v_compliance") {
        var dateObj = JSON.parse(tableau.connectionData)
        var url = "https://" + dateObj.submuni + ".mpspark.com/api/v1/quickstat/violation_v_compliance.json";
        // var url = "https://hamtramckmi.mpspark.com/api/v1/quickstat/violation_v_compliance.json";

        var xhr = new XMLHttpRequest();
        xhr.open("POST", url, false);

        xhr.setRequestHeader("Content-Type", "application/json");
        xhr.setRequestHeader("X-User-Token", tableau.password);
        xhr.setRequestHeader("X-User-Email", tableau.username);

        xhr.onreadystatechange = function () {
            if (xhr.readyState === 4) {
                console.log(xhr.status);
                //console.log(xhr.responseText);
            }
        };

        var data = '{"desired_history": "' + dateObj.desired_history + '"}';

        xhr.send(data);

        var jsonResponse = JSON.parse(xhr.responseText);
        var quickstat = jsonResponse.quickstat;
        var compliance = quickstat.compliance_revenue;
        var violation = quickstat.violation_revenue;
        var tableData = [];
        var myDate = new Date(quickstat.end_date);
        myDate.setDate(myDate.getDate() - 1);
        // Iterate over the JSON object
        for (var i = 0, len = compliance.length; i < len; i++) {
            tableData.push({
                "date": myDate.toLocaleString().split(",")[0],
                "compliance": compliance[i][1],
                "violation": violation[i][1],
            });
            myDate.setDate(myDate.getDate() - 1);
        }
    }

    if (table.tableInfo.id == "kiosks") {
        var dateObj = JSON.parse(tableau.connectionData)
        var url = "https://" + dateObj.submuni + ".mpspark.com/api/v1/kiosks.json";

        var xhr = new XMLHttpRequest();
        xhr.open("GET", url, false);

        xhr.setRequestHeader("Content-Type", "application/json");
        xhr.setRequestHeader("X-User-Token", tableau.password);
        xhr.setRequestHeader("X-User-Email", tableau.username);

        xhr.onreadystatechange = function () {
            if (xhr.readyState === 4) {
                console.log(xhr.status);
                //console.log(xhr.responseText);
            }
        };

        xhr.send();

        var jsonResponse = JSON.parse(xhr.responseText);
        var lots = jsonResponse.open_parking_lots;
        var tableData = [];
        // Iterate over the JSON object
        for (var i = 0, lots_len = lots.length; i < lots_len; i++) {
            tableData.push({
                "name": lots[i].name,
                "latitude": lots[i].latitude,
                "longitude": lots[i].longitude,
                "address": lots[i].address_street_1,
                "city": lots[i].city,
                "state": lots[i].state,
                "spaces": lots[i].spaces,
                "available": lots[i].kiosks[0].spots_available,
            });
        }
    }

    if (table.tableInfo.id == "hourly_parking_sessions") {
        var dateObj = JSON.parse(tableau.connectionData)
        var url = "https://" + dateObj.submuni + ".mpspark.com/api/v1/quickstat/hourly_parking_sessions.json";
        //var url = "https://hamtramckmi.mpspark.com/api/v1/quickstat/hourly_parking_sessions.json";

        var xhr = new XMLHttpRequest();
        xhr.open("POST", url, false);

        xhr.setRequestHeader("Content-Type", "application/json");
        xhr.setRequestHeader("X-User-Token", tableau.password);
        xhr.setRequestHeader("X-User-Email", tableau.username);

        xhr.onreadystatechange = function () {
            if (xhr.readyState === 4) {
                console.log(xhr.status);
                //console.log(xhr.responseText);
            }
        };

        var data = '{"desired_history": "' + dateObj.desired_history + '"}';

        xhr.send(data);

        var jsonResponse = JSON.parse(xhr.responseText);
        var quickstat = jsonResponse.quickstat;
        var raw = quickstat.raw_historical_values;
        var scaled = quickstat.scaled_historical_values;
        var tableData = [];
        var myDate = new Date(quickstat.end_date);
        // Iterate over the JSON object
        for (var i = 0, len = raw.length; i < len; i++) {
            let ampm = myDate.getHours() >= 12 ? 'pm' : 'am';
            hours = myDate.getHours() % 12;
            hours = hours ? hours : 12;
            tableData.push({
                "time": hours + ampm,
                "raw": raw[i],
                "scaled": scaled[i],
            });
            myDate.setHours(myDate.getHours() - 1);        
        }
    }
    if (table.tableInfo.id == "meters") {
        var dateObj = JSON.parse(tableau.connectionData)
        var url = "https://" + dateObj.submuni + ".mpspark.com/api/v1/meters.json";

        var xhr = new XMLHttpRequest();
        xhr.open("GET", url, false);

        xhr.setRequestHeader("Content-Type", "application/json");
        xhr.setRequestHeader("X-User-Token", tableau.password);
        xhr.setRequestHeader("X-User-Email", tableau.username);

        xhr.onreadystatechange = function () {
            if (xhr.readyState === 4) {
                console.log(xhr.status);
                //console.log(xhr.responseText);
            }
        };

        xhr.send();

        var jsonResponse = JSON.parse(xhr.responseText);
        var meter_groups = jsonResponse.meter_groups;
        var tableData = [];
        // Iterate over the JSON object
        for (var i = 0, groups_len = meter_groups.length; i < groups_len; i++) {
            var meters = meter_groups[i].meters;
            for (var j = 0, meters_len = meters.length; j < meters_len; j++) {
                tableData.push({
                    "id": meters[j].id,
                    "friendly_name": meters[j].friendly_name,
                    "friendly_type": meters[j].friendly_type,
                    "latitude": meters[j].latitude,
                    "longitude": meters[j].longitude,
                    "meter_group_id": meters[j].meter_group_id,
                    "meter_group_name": meters[j].meter_group_name,
                    "meter_capacity": meters[j].spot_capacity,
                    "spots_available": meters[j].spots_available,
                    "maintenance_mode": meters[j].maintenance_mode,
                });
            }
        }
    }
    if (table.tableInfo.id == "device_hourly_violations") {
        var dateObj = JSON.parse(tableau.connectionData)
        var url = "https://" + dateObj.submuni + ".mpspark.com/api/v1/violations/device_approved_violation_summary_by_hour_grouped.json";

        var xhr = new XMLHttpRequest();
        xhr.open("GET", url, false);

        xhr.setRequestHeader("Content-Type", "application/json");
        xhr.setRequestHeader("X-User-Token", tableau.password);
        xhr.setRequestHeader("X-User-Email", tableau.username);

        xhr.onreadystatechange = function () {
            if (xhr.readyState === 4) {
                console.log(xhr.status);
                //console.log(xhr.responseText);
            }
        };

        xhr.send();

        var jsonResponse = JSON.parse(xhr.responseText);
        var vios = jsonResponse.device_approved_violation_summary_by_hour_grouped;
        var tableData = [];
        // Iterate over the JSON object
        for (var i = 0, vio_len = vios.length; i < vio_len; i++) {
            tableData.push({
                "friendly_name": vios[i].device_name,
                "violations": vios[i].hour_00_30_day});
            tableData.push({
                "friendly_name": vios[i].device_name,
                "violations": vios[i].hour_01_30_day});
            tableData.push({
                "friendly_name": vios[i].device_name,
                "violations": vios[i].hour_02_30_day});
            tableData.push({
                "friendly_name": vios[i].device_name,
                "violations": vios[i].hour_03_30_day});
            tableData.push({
                "friendly_name": vios[i].device_name,
                "violations": vios[i].hour_04_30_day});
            tableData.push({
                "friendly_name": vios[i].device_name,
                "violations": vios[i].hour_05_30_day});
            tableData.push({
                "friendly_name": vios[i].device_name,
                "violations": vios[i].hour_06_30_day});
            tableData.push({
                "friendly_name": vios[i].device_name,
                "violations": vios[i].hour_07_30_day});
            tableData.push({
                "friendly_name": vios[i].device_name,
                "violations": vios[i].hour_08_30_day});
            tableData.push({
                "friendly_name": vios[i].device_name,
                "violations": vios[i].hour_09_30_day});
            tableData.push({
                "friendly_name": vios[i].device_name,
                "violations": vios[i].hour_10_30_day});
            tableData.push({
                "friendly_name": vios[i].device_name,
                "violations": vios[i].hour_11_30_day});
            tableData.push({
                "spot_capacity": vios[i].spot_capacity,
                "friendly_name": vios[i].device_name,
                "violations": vios[i].hour_12_30_day});
            tableData.push({
                "friendly_name": vios[i].device_name,
                "violations": vios[i].hour_13_30_day});
            tableData.push({
                "friendly_name": vios[i].device_name,
                "violations": vios[i].hour_14_30_day});
            tableData.push({
                "friendly_name": vios[i].device_name,
                "violations": vios[i].hour_15_30_day});
            tableData.push({
                "friendly_name": vios[i].device_name,
                "violations": vios[i].hour_16_30_day});
            tableData.push({
                "friendly_name": vios[i].device_name,
                "violations": vios[i].hour_17_30_day});
            tableData.push({
                "friendly_name": vios[i].device_name,
                "violations": vios[i].hour_18_30_day});
            tableData.push({
                "friendly_name": vios[i].device_name,
                "violations": vios[i].hour_19_30_day});
            tableData.push({
                "friendly_name": vios[i].device_name,
                "violations": vios[i].hour_20_30_day});
            tableData.push({
                "friendly_name": vios[i].device_name,
                "violations": vios[i].hour_21_30_day});
            tableData.push({
                "friendly_name": vios[i].device_name,
                "violations": vios[i].hour_22_30_day});
            tableData.push({
                "friendly_name": vios[i].device_name,
                "violations": vios[i].hour_23_30_day});
        }
    }

    if (table.tableInfo.id == "spots") {
        var dateObj = JSON.parse(tableau.connectionData)
        var url = "https://" + dateObj.submuni + ".mpspark.com/api/v1/meters.json";

        var xhr = new XMLHttpRequest();
        xhr.open("GET", url, false);

        xhr.setRequestHeader("Content-Type", "application/json");
        xhr.setRequestHeader("X-User-Token", tableau.password);
        xhr.setRequestHeader("X-User-Email", tableau.username);

        xhr.onreadystatechange = function () {
            if (xhr.readyState === 4) {
                console.log(xhr.status);
                //console.log(xhr.responseText);
            }
        };

        xhr.send();

        var jsonResponse = JSON.parse(xhr.responseText);
        var meter_groups = jsonResponse.meter_groups;
        var tableData = [];
        // Iterate over the JSON object
        for (var i = 0, groups_len = meter_groups.length; i < groups_len; i++) {
            var meters = meter_groups[i].meters;
            for (var j = 0, meters_len = meters.length; j < meters_len; j++) {
                var spots = meters[j].spots;
                for (var k = 0, spots_len = spots.length; k < spots_len; k++) {
                    tableData.push({
                    "name": spots[k].name,
                    "full_name": spots[k].name + "@" + dateObj.submuni,
                    "legacy_spot_id": spots[k].legacy_spot_id,
                    "latitude": spots[k].latitude,
                    "longitude": spots[k].longitude,
                    "available": spots[k].available,
                    "device_id": spots[k].id,
                    });
                }
            }
        }
    }

    if (table.tableInfo.id == "current_sessions") {
        var dateObj = JSON.parse(tableau.connectionData)
        var url = "https://" + dateObj.submuni + ".mpspark.com/api/v1/meters.json";

        var xhr = new XMLHttpRequest();
        xhr.open("GET", url, false);

        xhr.setRequestHeader("Content-Type", "application/json");
        xhr.setRequestHeader("X-User-Token", tableau.password);
        xhr.setRequestHeader("X-User-Email", tableau.username);

        xhr.onreadystatechange = function () {
            if (xhr.readyState === 4) {
                console.log(xhr.status);
                //console.log(xhr.responseText);
            }
        };

        xhr.send();

        var jsonResponse = JSON.parse(xhr.responseText);
        var meter_groups = jsonResponse.meter_groups;
        var tableData = [];
        // Iterate over the JSON object
        for (var i = 0, groups_len = meter_groups.length; i < groups_len; i++) {
            var meters = meter_groups[i].meters;
            for (var j = 0, meters_len = meters.length; j < meters_len; j++) {
                url = "https://" + dateObj.submuni + ".mpspark.com/api/v1/meters/" + meters[j].id + "/parking_sessions.json";
                //console.log(url);
                device_xhr = new XMLHttpRequest();
                device_xhr.open("GET", url, false);
                device_xhr.setRequestHeader("Content-Type", "application/json");
                device_xhr.setRequestHeader("X-User-Token", tableau.password);
                device_xhr.setRequestHeader("X-User-Email", tableau.username);
                device_xhr.send(data);
                device_xhr.onreadystatechange = function () {
                    if (device_xhr.readyState === 4) {
                        console.log("Parking session status ", device_xhr.status);
                    }
                }
                var jsonResponse = JSON.parse(device_xhr.responseText);
                var parking_sessions = jsonResponse.parking_sessions;
                for (var z = 0, sessions_len = parking_sessions.length; z < sessions_len; z++) {
                    url = "https://" + dateObj.submuni + ".mpspark.com/api/v1/snmp/device_mib/get_single_device.json?device_id=" + parking_sessions[z].device_id
                    //console.log(url);
                    mib_xhr = new XMLHttpRequest();
                    mib_xhr.open("GET", url, false);
                    mib_xhr.setRequestHeader("Content-Type", "application/json");
                    mib_xhr.setRequestHeader("X-User-Token", tableau.password);
                    mib_xhr.setRequestHeader("X-User-Email", tableau.username);
                    mib_xhr.send(data);
                    var jsonResponse = JSON.parse(mib_xhr.responseText);
                    var device = jsonResponse.device;
                    
                    var violations = parking_sessions[z].violations;
                    var payments = parking_sessions[z].payments;
                    tableData.push({
                    "id": parking_sessions[z].device_id,
                    "name": parking_sessions[z].spot_name,
                    "estimated_time_remaining": parking_sessions[z].estimated_time_remaining,
                    "free_time_remaining": parking_sessions[z].free_time_remaining,
                    "violations": violations.length,
                    "payments": payments.length,
                    "park_timestamp": parking_sessions[z].park_timestamp,
                    "camera_url": "http://" + device.ip_address + ":8082/all",
                    });
                }
            }
        }
    }

    if (table.tableInfo.id == "daily_parking_sessions") {
        var dateObj = JSON.parse(tableau.connectionData)
        var url = "https://" + dateObj.submuni + ".mpspark.com/api/v1/quickstat/daily_parking_sessions.json";
        //var url = "https://hamtramckmi.mpspark.com/api/v1/quickstat/daily_parking_sessions.json";

        var xhr = new XMLHttpRequest();
        xhr.open("POST", url, false);

        xhr.setRequestHeader("Content-Type", "application/json");
        xhr.setRequestHeader("X-User-Token", tableau.password);
        xhr.setRequestHeader("X-User-Email", tableau.username);

        xhr.onreadystatechange = function () {
            if (xhr.readyState === 4) {
                console.log(xhr.status);
                //console.log(xhr.responseText);
            }
        };

        var data = '{"desired_history": "' + dateObj.desired_history + '"}';

        xhr.send(data);

        var jsonResponse = JSON.parse(xhr.responseText);
        var quickstat = jsonResponse.quickstat;
        var raw = quickstat.raw_historical_values;
        var scaled = quickstat.scaled_historical_values;
        var tableData = [];
        var myDate = new Date(quickstat.end_date);
        myDate.setDate(myDate.getDate() - 1);
        // Iterate over the JSON object
        for (var i = 0, len = raw.length; i < len; i++) {
            tableData.push({
                "date": myDate.toLocaleString().split(",")[0],
                "raw": raw[i],
                "scaled": scaled[i],
            });
            myDate.setDate(myDate.getDate() - 1);
        }
    }
    if (table.tableInfo.id == "daily_revenue") {
        var dateObj = JSON.parse(tableau.connectionData)
        var url = "https://corsproxy.io/?https://" + dateObj.submuni + ".mpspark.com/api/v1/quickstat/daily_revenue.json";
        //var url = "https://hamtramckmi.mpspark.com/api/v1/quickstat/daily_revenue.json";

        var xhr = new XMLHttpRequest();
        xhr.open("POST", url, false);

        xhr.setRequestHeader("Access-Control-Allow-Origin", "*");
        xhr.setRequestHeader("Access-Control-Allow-Methods", "POST, GET, PUT");
        xhr.setRequestHeader("Access-Control-Allow-Headers", "Content-Type");
        xhr.setRequestHeader("Content-Type", "application/json");
        xhr.setRequestHeader("X-User-Token", tableau.password);
        xhr.setRequestHeader("X-User-Email", tableau.username);

        xhr.onreadystatechange = function () {
            if (xhr.readyState === 4) {
                console.log(xhr.status);
                //console.log(xhr.responseText);
            }
        };

        var data = '{"desired_history": "' + dateObj.desired_history + '"}';

        xhr.send(data);

        var jsonResponse = JSON.parse(xhr.responseText);
        var quickstat = jsonResponse.quickstat;
        var raw = quickstat.raw_historical_values;
        var scaled = quickstat.scaled_historical_values;
        var tableData = [];
        var myDate = new Date(quickstat.end_date);
        // Iterate over the JSON object
        for (var i = 0, len = raw.length; i < len; i++) {
            tableData.push({
                "date": myDate.toLocaleString().split(",")[0],
                "raw": raw[i],
                "scaled": scaled[i],
            });
            myDate.setDate(myDate.getDate() - 1);
        }
    }
    if (table.tableInfo.id == "daily_revenue_card") {
        var dateObj = JSON.parse(tableau.connectionData)
        var url = "https://" + dateObj.submuni + ".mpspark.com/api/v1/quickstat/daily_revenue.json";
        //var url = "https://hamtramckmi.mpspark.com/api/v1/quickstat/daily_revenue.json";

        var xhr = new XMLHttpRequest();
        xhr.open("POST", url, false);

        xhr.setRequestHeader("Content-Type", "application/json");
        xhr.setRequestHeader("X-User-Token", tableau.password);
        xhr.setRequestHeader("X-User-Email", tableau.username);

        xhr.onreadystatechange = function () {
            if (xhr.readyState === 4) {
                console.log(xhr.status);
                //console.log(xhr.responseText);
            }
        };

        var data = '{"desired_history": "' + dateObj.desired_history + '", "method_type": "credit_card"}';

        xhr.send(data);

        var jsonResponse = JSON.parse(xhr.responseText);
        var quickstat = jsonResponse.quickstat;
        var raw = quickstat.raw_historical_values;
        var scaled = quickstat.scaled_historical_values;
        var tableData = [];
        var myDate = new Date(quickstat.end_date);
        // Iterate over the JSON object
        for (var i = 0, len = raw.length; i < len; i++) {
            tableData.push({
                "date": myDate.toLocaleString().split(",")[0],
                "raw": raw[i],
                "scaled": scaled[i],
            });
            myDate.setDate(myDate.getDate() - 1);
        }
    }
    if (table.tableInfo.id == "daily_revenue_coin") {
        var dateObj = JSON.parse(tableau.connectionData)
        var url = "https://" + dateObj.submuni + ".mpspark.com/api/v1/quickstat/daily_revenue.json";
        //var url = "https://hamtramckmi.mpspark.com/api/v1/quickstat/daily_revenue.json";

        var xhr = new XMLHttpRequest();
        xhr.open("POST", url, false);

        xhr.setRequestHeader("Content-Type", "application/json");
        xhr.setRequestHeader("X-User-Token", tableau.password);
        xhr.setRequestHeader("X-User-Email", tableau.username);

        xhr.onreadystatechange = function () {
            if (xhr.readyState === 4) {
                console.log(xhr.status);
                //console.log(xhr.responseText);
            }
        };

        var data = '{"desired_history": "' + dateObj.desired_history + '", "method_type": "cash"}';

        xhr.send(data);

        var jsonResponse = JSON.parse(xhr.responseText);
        var quickstat = jsonResponse.quickstat;
        var raw = quickstat.raw_historical_values;
        var scaled = quickstat.scaled_historical_values;
        var tableData = [];
        var myDate = new Date(quickstat.end_date);
        // Iterate over the JSON object
        for (var i = 0, len = raw.length; i < len; i++) {
            tableData.push({
                "date": myDate.toLocaleString().split(",")[0],
                "raw": raw[i],
                "scaled": scaled[i],
            });
            myDate.setDate(myDate.getDate() - 1);
        }
    }
    if (table.tableInfo.id == "daily_violation_issued_revenue") {
        var dateObj = JSON.parse(tableau.connectionData)
        var url = "https://" + dateObj.submuni + ".mpspark.com/api/v1/quickstat/daily_violation_issued_revenue.json";
        //var url = "https://hamtramckmi.mpspark.com/api/v1/quickstat/daily_violation_issued_revenue.json";

        var xhr = new XMLHttpRequest();
        xhr.open("POST", url, false);

        xhr.setRequestHeader("Content-Type", "application/json");
        xhr.setRequestHeader("X-User-Token", tableau.password);
        xhr.setRequestHeader("X-User-Email", tableau.username);

        xhr.onreadystatechange = function () {
            if (xhr.readyState === 4) {
                console.log(xhr.status);
                //console.log(xhr.responseText);
            }
        };

        var data = '{"desired_history": "' + dateObj.desired_history + '"}';

        xhr.send(data);

        var jsonResponse = JSON.parse(xhr.responseText);
        var quickstat = jsonResponse.quickstat;
        var raw = quickstat.raw_historical_values;
        var scaled = quickstat.scaled_historical_values;
        var tableData = [];
        var myDate = new Date(quickstat.end_date);
        myDate.setDate(myDate.getDate() - 1);
        // Iterate over the JSON object
        for (var i = 0, len = raw.length; i < len; i++) {
            tableData.push({
                "date": myDate.toLocaleString().split(",")[0],
                "raw": raw[i],
                "scaled": scaled[i],
            });
            myDate.setDate(myDate.getDate() - 1);
        }
    }
    if (table.tableInfo.id == "violation_quick_stats") {
        var dateObj = JSON.parse(tableau.connectionData)
        var url = "https://" + dateObj.submuni + ".mpspark.com/api/v1/quickstat/violation_quick_stats.json";
        //var url = "https://hamtramckmi.mpspark.com/api/v1/quickstat/violation_quick_stats.json";

        var xhr = new XMLHttpRequest();
        xhr.open("POST", url, false);

        xhr.setRequestHeader("Content-Type", "application/json");
        xhr.setRequestHeader("X-User-Token", tableau.password);
        xhr.setRequestHeader("X-User-Email", tableau.username);

        xhr.onreadystatechange = function () {
            if (xhr.readyState === 4) {
                console.log(xhr.status);
                //console.log(xhr.responseText);
            }
        };

        var data = '{"desired_history": "' + dateObj.desired_history + '"}';

        xhr.send(data);

        var jsonResponse = JSON.parse(xhr.responseText);
        var payload = jsonResponse.payload;
        var tableData = [];
        // Iterate over the JSON object
        for (var i = 0, len = payload.length; i < len; i++) {
            tableData.push({
                "date": payload[i].day,
                "total_violations": payload[i].total_violations,
                "total_rejected": payload[i].total_rejected,
                "coin_error": payload[i].coin_error,
                "no_violation_pictures_with_vehicle": payload[i].no_violation_pictures_with_vehicle,
                "no_entrance_pictures_with_vehicle": payload[i].no_entrance_pictures_with_vehicle,
                "other": payload[i].other,
                "no_movement": payload[i].no_movement,
                "mismatched_vehicles": payload[i].mismatched_vehicles,
                "missing_pictures": payload[i].missing_pictures,
            });
        }
    }
   if (table.tableInfo.id == "coin_jar_status_report") {
        var dateObj = JSON.parse(tableau.connectionData)
        var url = "https://" + dateObj.submuni + ".mpspark.com/api/v1/quickstat/coin_jar_status_report.json";

        var xhr = new XMLHttpRequest();
        xhr.open("POST", url, false);

        xhr.setRequestHeader("Content-Type", "application/json");
        xhr.setRequestHeader("X-User-Token", tableau.password);
        xhr.setRequestHeader("X-User-Email", tableau.username);

        xhr.onreadystatechange = function () {
            if (xhr.readyState === 4) {
                console.log(xhr.status);
                //console.log(xhr.responseText);
            }
        };

        var data = '{"desired_history": "' + dateObj.desired_history + '"}';

        xhr.send(data);

        var jsonResponse = JSON.parse(xhr.responseText);
        var payload = jsonResponse.payload;
        var tableData = [];
        // Iterate over the JSON object
        for (var i = 0, len = payload.length; i < len; i++) {
            if (payload[i].device_type == "Meter") {
            tableData.push({
                "id": payload[i].id,
                "friendly_name": payload[i].friendly_name,
                "device_type": payload[i].device_type,
                "coin_jar_percent_full": payload[i].coin_jar_percent_full,
                "coin_jar_coin_count": payload[i].coin_jar_coin_count,
                "coin_jar_current_value": payload[i].coin_jar_current_value,
                "coin_jar_coins": payload[i].coin_jar_coins,
                "coin_jar_last_harvest_datetime": payload[i].coin_jar_last_harvest_datetime,
                "coin_jar_last_harvest_value": payload[i].coin_jar_last_harvest_value,
                "coin_jar_last_update": payload[i].coin_jar_last_update,
                "average_cash_out_percent_full": payload[i].average_cash_out_percent_full,
                "average_cash_out_coin_count": payload[i].average_cash_out_coin_count,
                "average_cash_out_value": payload[i].average_cash_out_value/100.00,
                "average_cash_out_jar_age_hours": payload[i].average_cash_out_jar_age_hours,
                "num_cash_outs": payload[i].num_cash_outs,
                "coin_vault_door_last_update": payload[i].coin_vault_door_last_update,
                "address": payload[i].address,
                "latitude": payload[i].latitude,
                "longitude": payload[i].longitude,
            });
	}
        }
    }

    table.appendRows(tableData);
    doneCallback();

};


    tableau.registerConnector(myConnector);

// Create event listeners for when the user submits the form
$(document).ready(function () {
    $("#submitButton").click(function () {
        startDate = $('#start-date-one').val().trim();
        endDate = $('#end-date-one').val().trim();
        tableau.username = $('#username').val().trim();
        tableau.password = $('#password').val().trim();
        if (tableau.username == "" || tableau.password == "") {
            $('#errorMsg').html("Enter valid username and password.");
             console.log("ready: No username or password");
             return;
        }

        function isValidDate(dateStr) {
            var d = new Date(dateStr);
            return !isNaN(d.getDate());
        }

        function getNumberOfDays(start, end) {
            const date1 = new Date(start);
            const date2 = new Date(end);

            // One day in milliseconds
            const oneDay = 1000 * 60 * 60 * 24;

            // Calculating the time difference between two dates
            const diffInTime = date2.getTime() - date1.getTime();

            // Calculating the no. of days between two dates
            const diffInDays = Math.round(diffInTime / oneDay);

            return diffInDays;
        }

        // Run API tokens to log in and get token for the rest of the commands
        var url = "https://sentrylink.mpspark.com/api/v1/tokens.json"
        var xhr = new XMLHttpRequest();
        xhr.open("POST", url, false);

        xhr.setRequestHeader("Content-Type", "application/json");

        var data = '{"user" : {"email":"' + tableau.username + '" , "password":"' + tableau.password + '" }}';

        xhr.send(data);

        var jsonResponse = JSON.parse(xhr.responseText);
        console.log(jsonResponse);

        tableau.password = jsonResponse.token;

        var munis = jsonResponse.municipalities;
        var submuni = "";
        var muni_id = $('#muni-id').val().trim();
        for (var i = 0, len = munis.length; i < len; i++) {
            if(muni_id == munis[i].name) {
                submuni = munis[i].subdomain;
                console.log("ready: submuni ", submuni);
                break;
            }
            if (muni_id == "Premium, LA") {
                submuni = "premiumneworleans";
                console.log("ready: submuni ", submuni);
                break;
            }
        }
      
        if (tableau.password.length > 0 && isValidDate(startDate) && isValidDate(endDate)) {
            //desired_history =  getNumberOfDays(startDate, endDate);
            desired_history = $('#days-one').val().trim();

            var dateObj = {
                startDate: startDate,
                endDate: endDate,
                desired_history: desired_history,
                muni_id: muni_id,
                submuni: submuni,
            };
            console.log("ready: ", tableau.username, tableau.password, muni_id, submuni);
            tableau.connectionData = JSON.stringify(dateObj);
            tableau.connectionName = muni_id + " SentryLink Data";
            tableau.submit();
        } else {
            $('#errorMsg').html("Invalid authorization or invalid dates. For example, 2021-10-08.");
        }
    });

});
})();

