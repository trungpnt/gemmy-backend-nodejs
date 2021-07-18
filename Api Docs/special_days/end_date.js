POST /api/special-days/end-date

{
    "total_session": 10,
    "date_start": "07/06/1990",
    "class_session": [
        "Mon",
        "Wed",
        "Thur"
    ]
}


expected_output = 

    "dates":[
        "07/06/1990", + day
        "07/06/1990",
        "07/06/1990",
        "07/06/1990",
        "07/06/1990",
    ],
    "date_end" : "xxxxxx",
}

expected_output = "distant_dates":[
    [
        {
            "previous_date_occur": {
                "date": "25/06/1990",
                "day" : "Monday"
            },
            
            "found_date_occur": {
                "date": "02/07/1990",
                "day" : "Monday"
            },
            "matched_special_day": [
                "07/06/1990",
            ],
            "month_transition": "JULY-AUGUST"
        },

    ]
]