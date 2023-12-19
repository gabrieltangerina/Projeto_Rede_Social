const { grupoModel } = require('../models/GrupoModel');
const { Postagem } = require('../models/PostagemModel');

exports.descricaoGrupo = async function (req, res) {
    try {

        // const user = req.session.user;
        const grupoNome = req.body.grupo;
        const descricao = req.body.descricao;

        // Use await para esperar a conclusão da consulta
        const CheckGrupoExiste = await grupoModel.findOne({ grupo: grupoNome });

        if (CheckGrupoExiste) {
            // Atualizar a descrição se o grupo existir
            CheckGrupoExiste.descricao = descricao;
            await CheckGrupoExiste.save();
        } else {
            // Se o grupo não existir, criar um novo
            const novoGrupo = await grupoModel.create({ grupo: grupoNome, descricao: descricao });
            // Verificar se a criação foi bem-sucedida antes de continuar
            if (novoGrupo) {
                // Pode fazer algo aqui se necessário
                // console.log("Deu certo");
            } else {
                // Lida com a falha na criação do grupo
                console.error('Erro ao criar um novo grupo.');
                return;
            }
        }


        // const postagensGrupo = await Postagem.buscarPostagens({ grupo: `${user.grupo}` });
        // res.render("postagem", { user, postagensGrupo });
        res.redirect('/postagem');

    } catch (e) {
        console.error(e);
        res.render('erro'); // Status 500 para erro interno do servidor
    }
};

exports.participantes = async function (req, res) {
    try {

        const grupoNome = req.body.grupo;
        const participantes = req.body.participantes;
        console.log(participantes);

        // Use await para esperar a conclusão da consulta
        const CheckGrupoExiste = await grupoModel.findOne({ grupo: grupoNome });

        if (CheckGrupoExiste) {
            // Atualizar a descrição se o grupo existir
            CheckGrupoExiste.participantes = participantes;
            await CheckGrupoExiste.save();
        } else {
            // Se o grupo não existir, criar um novo
            const novoGrupo = await grupoModel.create({ grupo: grupoNome, participantes });
            // Verificar se a criação foi bem-sucedida antes de continuar
            if (novoGrupo) {
                // Pode fazer algo aqui se necessário
                // console.log("Deu certo");
            } else {
                // Lida com a falha na criação do grupo
                console.error('Erro ao criar um novo grupo.');
                return;
            }
        }


        res.redirect('/postagem');

    } catch (e) {
        console.log(e);
        res.render('erro');
    }
}
