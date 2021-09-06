import sqlite3
import os
from flask import abort, Flask, g, jsonify, request

DATABASE = "./database.db"


app = Flask(
    __name__,
    static_folder=os.environ.get("STATIC_ROOT"),
    static_url_path="/"
)


@app.route("/")
def index():
    return app.send_static_file("index.html")


@app.route("/api/reading-list", methods=["GET", "POST"])
def reading_list():
    if request.method == "POST":
        id = request.json["id"]
        title = request.json["title"]
        lastauthor = request.json["lastauthor"]
        journal = request.json["journal"]
        pubdate = request.json["pubdate"]
        link = request.json["link"]

        try:
            post_db("INSERT INTO articles "
                    f"VALUES ({id}, '{title}', '{lastauthor}', '{journal}', "
                    f"'{pubdate}', '{link}')")
            return "success"
        except Exception as e:
            print(e)
            abort(500)

    if request.method == "GET":
        results = [
            dict(
                id=row[0],
                title=row[1],
                lastauthor=row[2],
                journal=row[3],
                pubdate=row[4],
                link=row[5],
            ) for row in query_db("select * from articles")
        ]
        return jsonify(results)


def get_db():
    db = getattr(g, "_database", None)
    if db is None:
        db = g._database = sqlite3.connect(DATABASE)
    db.row_factory = sqlite3.Row
    return db


@app.teardown_appcontext
def close_connection(exception):
    db = getattr(g, "_database", None)
    if db is not None:
        db.close()


def query_db(query, args=()):
    cur = get_db().execute(query, args)
    rv = cur.fetchall()
    cur.close()
    return rv


def post_db(query):
    db = get_db()
    cur = db.execute(query)
    db.commit()
    cur.close()

