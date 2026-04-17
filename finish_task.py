import urllib.request
try:
    req = urllib.request.Request('http://127.0.0.1:23000/pre_commit')
    urllib.request.urlopen(req)
except Exception as e:
    print(e)
