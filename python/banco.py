
import sqlite3

class Banco:
    def __init__(self):
        self.conexao = sqlite3.connect('../model/db/database.db')

    def select(self, sql):
        cursor = self.conexao.cursor()
        cursor.execute(sql)
        return cursor.fetchall()

    def insert(self, sql):
        cursor = self.conexao.cursor()
        cursor.execute(sql)
        self.conexao.commit()
        return cursor.lastrowid

    def update(self, sql):
        cursor = self.conexao.cursor()
        cursor.execute(sql)
        self.conexao.commit()
        return cursor.rowcount

    def delete(self, sql):
        cursor = self.conexao.cursor()
        cursor.execute(sql)
        self.conexao.commit()
        return cursor.rowcount

    def getReconhecimentoToVectorize(self):
        return self.select("SELECT * FROM reconhecimentos WHERE imagevector IS NULL")

    def updateReconhecimentoImageVector(self, ide, imagevector):
        return self.update("UPDATE reconhecimentos SET imagevector = '{}' WHERE id = {}".format(imagevector, ide))

    def getReconhecimentoToRecognize(self):
        return self.select("SELECT * FROM reconhecimentos WHERE imagevector IS NOT NULL AND user_id IS NULL")

    def getAllImageVectorFaces(self):
        return self.select("SELECT imagevector FROM faces")

    def updateReconhecimentoUser(self, ide, user_id):
        return self.update("UPDATE reconhecimentos SET user_id = '{}' WHERE id = {}".format(user_id, ide))

    def __del__(self):
        self.conexao.close()