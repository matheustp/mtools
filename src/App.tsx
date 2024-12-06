import React, { useEffect, useState } from 'react';

interface Conteudo {
    remetente?: string;
    assunto?: string;
    titulo?: string;
    title?: string;
    corpo?: string;
    calltoaction?: string;
    body?: string;
    link?: string;
    type?: string;
    tpLink?: string;
    typepfios?: string;
    texto?: string;
    telefone?: string;
    ddd?: string;
    ddi?: string;
}

interface Componente {
    tipo: string;
    texto?: string;
    classes?: string[] | null;
    elemento?: string;
    acao?: string;
    cta?: string | null;
}

interface Meio {
    tipo: string;
    destinatarios?: string;
    conteudo?: Conteudo;
    preferencia?: string | null;
    valor?: string | null;
    versaoMinimaApp?: string;
    componentes?: Componente[];
}

interface Config {
    canal: string;
    origem: string;
    etapa: string;
    dormencia: number;
    frequencia: number;
    prioridade: number;
}

interface Resposta {
    tipo: string;
    componentes?: Componente[];
}

interface CcmTemplateComunicacaoItem {
    nome: string;
    config?: Config | null;
    tags?: string[] | null;
    respostas?: Resposta[];
    meios: Meio[];
}

interface CcmTemplateComunicacaoList {
    items: CcmTemplateComunicacaoItem[];
}

interface Data {
    ccmTemplateComunicacaoList: CcmTemplateComunicacaoList;
}

interface RootObject {
    data: Data;
}

const App: React.FC = () => {
    const [templates, setTemplates] = useState<CcmTemplateComunicacaoItem[]>([]);
    const [loading, setLoading] = useState<boolean>(true);
    const [error, setError] = useState<boolean>(false);

    useEffect(() => {
        fetch('https://publish-p128342-e1257512.adobeaemcloud.com/graphql/execute.json/banco-bradesco/ccm-template-filter')
            .then(response => {
                if (!response.ok) {
                    throw new Error('Network response was not ok');
                }
                return response.json();
            })
            .then(data => {
                setTemplates(data.data.ccmTemplateComunicacaoList.items);
                setLoading(false);
            })
            .catch(() => {
                setError(true);
                setLoading(false);
            });
    }, []);

    if (loading) {
        return <div>Loading...</div>;
    }

    if (error) {
        return <div>Error loading data.</div>;
    }

    return (
        <div>
            <h1>Template List</h1>
            <table>
                <thead>
                <tr>
                    <th>Nome</th>
                    <th>Canal</th>
                    <th>Etapa</th>
                    <th>Origem</th>
                    <th>Prioridade</th>
                    <th>Dormencia</th>
                    <th>Frequencia</th>
                    <th>Meios</th>
                    <th>Tags</th>
                </tr>
                </thead>
                <tbody>
                {templates.map(template => (
                    <tr key={template.nome}>
                        <td>{template.nome}</td>
                        <td>{template.config?.canal}</td>
                        <td>{template.config?.etapa}</td>
                        <td>{template.config?.origem}</td>
                        <td>{template.config?.prioridade}</td>
                        <td>{template.config?.dormencia}</td>
                        <td>{template.config?.frequencia}</td>
                        <td>{template.meios.map((c) => `$${c.tipo}`).join(' - ')}</td>
                        <td>{template.tags?.join(' - ')}</td>
                    </tr>
                ))}
                </tbody>
            </table>
        </div>
    );
};

export default App;