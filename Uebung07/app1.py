import uvicorn
from fastapi import FastAPI

app = FastAPI()

d= {}

file = open("PLZO_CSV_LV95.csv", encoding="utf-8")
next(file)
for line in file:
    daten= line.strip().split(";")
    ortn = daten [0]
    zip = daten [1]
    zusatzz = daten [2]
    name = daten[3]
    bsfnr = daten[4]
    kt = daten[5]
    E = daten[6]
    N = daten[7]
    sprache = daten[8]
    d[name]={"ZIP":zip, "Zusatzzahl": zusatzz, "Ortschaft": ortn, "BSF-NR":bsfnr, "Kanton": kt, "E": E, "N": N, "Sprache": sprache}
file.close()

@app.get("/ort")
async def ort(ort:str):
    if ort in d: 
        return d[ort]
    
    return {"ERROR": "ORTSCHAFT GIBT ES NICHT"}

uvicorn.run(app, host= "127.0.0.1", port=8000)