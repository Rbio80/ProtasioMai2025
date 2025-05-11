import os

# Caminho da pasta onde estão os arquivos .htm
pasta = "."  # Use "." se o script estiver na mesma pasta

for nome_arquivo in os.listdir(pasta):
    if nome_arquivo.endswith(".htm") or nome_arquivo.endswith(".html"):
        caminho_arquivo = os.path.join(pasta, nome_arquivo)
        with open(caminho_arquivo, "r", encoding="utf-8") as f:
            conteudo = f.read()

        # Verifica se já tem a tag viewport
        if '<meta name="viewport"' not in conteudo:
            novo_conteudo = conteudo.replace(
                '<meta http-equiv="content-Type" content="Text/html; charset=UTF-8" />',
                '''<meta http-equiv="content-Type" content="Text/html; charset=UTF-8" />
<meta name="viewport" content="width=device-width, initial-scale=1">'''
            )
            with open(caminho_arquivo, "w", encoding="utf-8") as f:
                f.write(novo_conteudo)
            print(f"✅ Atualizado: {nome_arquivo}")
