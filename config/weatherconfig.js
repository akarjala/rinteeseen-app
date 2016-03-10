// 0=Kittilä, 1=Ylläsjärvi, 3=Ruka

module.exports = [{
	host: 'api.met.no',
	port: 80,
	path: '/weatherapi/locationforecast/1.9/?lat=67.66;lon=24.90',
	method: 'GET',
	headers: {
		'Content-Type': 'text/plain'
  }},{
    host: 'api.met.no',
    port: 80,
    path: '/weatherapi/locationforecast/1.9/?lat=67.52;lon=24.30',
    method: 'GET',
    headers: {
        'Content-Type': 'text/plain'
  }},{
    host: 'api.met.no',
    port: 80,
    path: '/weatherapi/locationforecast/1.9/?lat=66.16;lon=29.12',
    method: 'GET',
    headers: {
        'Content-Type': 'text/plain'
  }

}];



