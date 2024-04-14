from flask import Flask
from flask import request
from flask import Response
from flask_cors import CORS
from datetime import datetime
import json
import time
import os


import average

app = Flask(__name__)
CORS(app)

startTime = time.time()


@app.route('/')
def getaveragenumber():

    modules = [request.args.get('module_1'), request.args.get('module_2'), request.args.get('module_3'),
               request.args.get('module_4'), request.args.get('module_5')]

    marks = [request.args.get('mark_1'), request.args.get('mark_2'), request.args.get('mark_3'),
             request.args.get('mark_4'), request.args.get('mark_5')]

    print(marks)
    print(modules)


    for x in marks:
        for j in modules:
            if (x == None or j is None):
                r = {
                    "ErrorMessage": "values can not be null, please provide valid values",
                    "Status": "400",
                    "marks": marks
                }
                reply = json.dumps(r)
                response = Response(response=reply, status=400)
                return response

    try:
        m1 = int(request.args.get('mark_1'))
        m2 = int(request.args.get('mark_2'))
        m3 = int(request.args.get('mark_3'))
        m4 = int(request.args.get('mark_4'))
        m5 = int(request.args.get('mark_5'))
        z = average.avg(m1, m2, m3, m4, m5)
    except ValueError:
        r = {
            "ErrorMessage": "error processing mark values, try provide valid values",
            "Status": "400",
            "marks": marks
            }
        response = Response(response=r, status=400)
        return response

    r = {
        "error": False,
        "errorMsg": "",
        "marks": marks,
        'modules': modules,
        "func": "average",
        "average": z
    }

    reply = json.dumps(r)
    response = Response(response=reply, status=200)
    return response


@app.get("/monitor")
def getMonitoring():

    r = {
        "date": datetime.now().strftime("%Y-%m-%d %H:%M:%S.%f"),
        "server-health": "OK",
        "uptime": time.time() - startTime
    }

    reply = json.dumps(r)
    response = Response(response=reply, status=200)
    return response


if __name__ == '__main__':
    app.run(host='0.0.0.0', port=80)


