export const list = [
	{
		'id':1,
		'name':'United States',
		'code':'US',
		'type':'Nation'
	},
	{
		'id':2,
		'name':'North East',
		'code':'NE',
		'type':'Region'
	},
	{
		'id':3,
		'name':'Children of the Lost Eden',
		'code':'NY-004',
		'type':'Domain'
	},
	{
		'id':4,
		'name':'The Bitten Apple',
		'code':null,
		'type':'Venue',
		'venueType':'CL'
	},
	{
		'id':5,
		'name':'North Central',
		'code':'NC',
		'type':'Region'
	},
	{
		'id':6,
		'name':'Nuclear Winter',
		'code':'ND-001',
		'type':'Domain'
	},
	{
		'id':7,
		'name':'Domain of Pending Doom',
		'code':'ME-008',
		'type':'Domain'
	}
];

export const domain = {
	'unit':{
		'id':3,
		'name':'Children of the Lost Eden',
		'code':'NY-004',
		'location':'New York, NY',
		'website':'http://www.mesnyc.org',
		'type':'Domain',
		'defDoc':'City of New York, NY, Nassau and Suffolk County, Long Island, NY',
		'users':[
			{
				'id':3,
				'membershipNumber':'US2016010003',
				'firstName':'Test',
				'lastName':'RC',
				'nickname':null,
				'fullName':'Test RC',
				'membershipType':'Full',
				'membershipExpiration':'2020-01-01T00:00:00.000Z'
			},
			{
				'id':4,
				'membershipNumber':'US2016010004',
				'firstName':'Test',
				'lastName':'DST',
				'nickname':null,
				'fullName':'Test DST',
				'membershipType':'Full',
				'membershipExpiration':'2020-01-01T00:00:00.000Z'
			},
			{
				'id':5,
				'membershipNumber':'US2016010005',
				'firstName':'Test',
				'lastName':'User',
				'nickname':null,
				'fullName':'Test User',
				'membershipType':'Full',
				'membershipExpiration':'2020-01-01T00:00:00.000Z'
			},
			{
				'id':6,
				'membershipNumber':'US2016010006',
				'firstName':'Test',
				'lastName':'Expired',
				'nickname':null,
				'fullName':'Test Expired',
				'membershipType':'Full',
				'membershipExpiration':'2000-01-01T00:00:00.000Z'
			},
			{
				'id':7,
				'membershipNumber':'US2016010007',
				'firstName':'Test',
				'lastName':'Trial',
				'nickname':null,
				'fullName':'Test Trial',
				'membershipType':'Trial',
				'membershipExpiration':'2020-01-01T00:00:00.000Z'
			},
			{
				'id':8,
				'membershipNumber':'US2012030038',
				'firstName':'Ephraim',
				'lastName':'Gregor',
				'nickname':null,
				'fullName':'Ephraim Gregor',
				'membershipType':'Full',
				'membershipExpiration':'2017-09-05T00:00:00.000Z'
			},
			{
				'id':11,
				'membershipNumber':'US2016010011',
				'firstName':'Test',
				'lastName':'Suspended',
				'nickname':null,
				'fullName':'Test Suspended',
				'membershipType':'Suspended',
				'membershipExpiration':'2020-01-01T00:00:00.000Z'
			}
		],
		'offices':[
			{
				'id':5,
				'name':'DST',
				'type':'Primary',
				'user':{
					'membershipNumber':'US2016010004',
					'firstName':'Test',
					'lastName':'DST',
					'userID':4
				}
			},
			{
				'id':6,
				'name':'aDST Vacant',
				'type':'Assistant',
				'user':null
			},
			{
				'id':7,
				'name':'DC',
				'type':'Primary',
				'user':{
					'membershipNumber':'US2012030038',
					'firstName':'Ephraim',
					'lastName':'Gregor',
					'userID':8
				}
			}
		]
	},
	'children':[
		{
			'id':4,
			'name':'The Bitten Apple',
			'code':null,
			'type':'Venue',
			'venueType':'CL'
		}
	],
	'parents':[
		{
			'id':1,
			'name':'United States',
			'code':'US',
			'type':'Nation'
		},
		{
			'id':2,
			'name':'North East',
			'code':'NE',
			'type':'Region'
		}
	]
};
