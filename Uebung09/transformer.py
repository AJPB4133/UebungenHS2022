import uvicorn
from pyproj import Transformer
from fastapi import FastAPI
app = FastAPI()


wgs84 = "epsg:4326"
lv95 = "epsg:2056"
transformer1 = Transformer.from_crs("epsg:4326", "epsg: 2056")


@app.get("/transform/")
async def root(lon : float= 0 , lat: float = 0):
    return {"LV-95":transformer1.transform(lon, lat)}



if __name__=="__main__":   
    uvicorn.run(app, host="127.0.0.1", port=8001, root_path="/transform/")