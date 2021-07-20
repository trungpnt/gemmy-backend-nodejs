add api/special-days/end-date to the router
POST
{
    "total_session": 10,
    "date_start": "07/06/1990",
    "class_session": [
        "Mon",
        "Wed",
        "Thur"
    ]
}

expected output : 
"dates":[
        "07/06/1990", + day
        "07/06/1990",
        "07/06/1990",
        "07/06/1990",
        "07/06/1990",
    ],
    "date_end" : "xxxxxx",

"distant_dates":
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
            "matched_special_days": [
                "07/06/1990",
            ],
            "month_transition": "JULY-AUGUST"
        },
		
		{
            "previous_date_occur": {
                "date": "25/06/1990",
                "day" : "Monday"
            },
            
            "found_date_occur": {
                "date": "02/07/1990",
                "day" : "Monday"
            },
			
            "matched_special_days": [
                "07/06/1990",
            ],
            "month_transition": "JULY-AUGUST"
        },
		
    ]

fixed logic inside get end date Function

add add api/special-days/manual-end-date to the router
[
	{
			"found_date_occur": {
                "date": "25/06/1990",
                "day" : "Monday"
            },
            "manual_date": {
                "date": "02/07/1990",
                "day" : "Monday"
            },
            "matched_special_days": [
                "07/06/1990",
            ],
            "month_transition": "JULY-AUGUST"
	},
	
	{
			"found_date_occur": {
                "date": "25/06/1990",
                "day" : "Monday"
            },
            "manual_date": {
                "date": "02/07/1990",
                "day" : "Monday"
            },
            "matched_special_days": [
                "07/06/1990",
            ],
            "month_transition": "JULY-AUGUST"
	}
]