import pyproj
import uvicorn
from pyproj import Transformer
from fastapi import FastAPI, Response
app = FastAPI()

g = pyproj.Geod(ellps="WGS84")

@app.get("/geodetic/")
async def root(startlon : float= 0 , startlat: float = 1, endlon: float=1, endlat: float=0):
    lonlats = g.npts(startlon, startlat, endlon, endlat, 30 )
    lonlats = [[startlon, startlat]]+ [list(i) for i in lonlats]+ [[[endlon,endlat]]]
    
    geojson = f"""{{
        "type": "Feature","geometry": {{"type": "MultiPoint","coordinates": {lonlats}}},"properties": {{"about": "Geodätische Linie"}}}}"""
    return Response(content=geojson)
    





if __name__=="__main__":   
    uvicorn.run(app, host="127.0.0.1", port=8002, root_path="/geodetic/")