import urllib.request
try:
    urllib.request.urlopen('http://127.0.0.1:23000/step_complete', data=b'step_id=1')
except:
    pass
