# Painel

Tudo o que falta decidir e validar, lido dos arquivos. Apagou do arquivo, some daqui. Precisa do plugin **Dataview**.

## Validação

```dataview
TABLE WITHOUT ID file.link AS "Arquivo", validado AS "Validado"
WHERE validado != null
SORT validado ASC, file.name ASC
```

## Em aberto

```dataview
TABLE WITHOUT ID key AS "Arquivo", rows.L.text AS "Pergunta"
FLATTEN file.lists AS L
WHERE meta(L.section).subpath = "Em aberto"
GROUP BY file.link
SORT key ASC
```
