// src/pages/PrivacyPolicy.jsx
import React from "react";

const PrivacyPolicy = () => {
  return (
    <main
      style={{
        padding: 20,
        maxWidth: 900,
        margin: "0 auto",
        fontFamily: "Arial, sans-serif",
        lineHeight: 1.6,
      }}
    >
      <h1>Política de Privacidade — EasyChat</h1>
      <p>
        <strong>Última atualização:</strong> 2025-11-10
      </p>

      <section>
        <h2>1. Introdução</h2>
        <p>
          A EasyChat ("nós", "nosso", "EasyChat") respeita sua privacidade e
          está comprometida em proteger seus dados pessoais. Esta Política
          explica quais dados coletamos, por que coletamos e como você pode
          gerenciar suas informações.
        </p>
      </section>

      <section>
        <h2>2. Dados que coletamos</h2>
        <ul>
          <li>
            Informações de conta: nome, número de telefone, identificador do
            usuário.
          </li>
          <li>
            Mensagens e histórico de conversas (quando armazenadas no nosso
            serviço).
          </li>
          <li>
            Metadados de mensagens: timestamps, remetente/recebedor, status
            (enviado/recebido).
          </li>
          <li>
            Dados técnicos: endereço IP, tipo de dispositivo, logs e informações
            de uso.
          </li>
        </ul>
      </section>

      <section>
        <h2>3. Integração com a API do WhatsApp</h2>
        <p>
          Para oferecer funcionalidade de envio/recebimento de mensagens, a
          EasyChat integra a API oficial da Meta/WhatsApp. Quando você utiliza
          recursos vinculados ao WhatsApp, some dados (por exemplo mensagens e
          números) podem ser transmitidos entre a EasyChat e a plataforma da
          Meta.
        </p>
        <p>
          A responsabilidade sobre como a Meta trata esses dados segue a
          política de privacidade e termos da Meta. Recomendamos que você revise
          também os termos da Meta/WhatsApp.
        </p>
      </section>

      <section>
        <h2>4. Finalidade do tratamento</h2>
        <p>Usamos os dados para:</p>
        <ul>
          <li>
            Permitir a troca de mensagens entre usuários e/ou clientes via
            WhatsApp.
          </li>
          <li>Prover suporte, auditoria, e resolução de problemas.</li>
          <li>Aprimorar o produto e gerar estatísticas anônimas.</li>
        </ul>
      </section>

      <section>
        <h2>5. Compartilhamento de dados</h2>
        <p>
          Podemos compartilhar dados com provedores de serviço que nos auxiliam
          na operação (por exemplo, provedores de hospedagem, analytics e
          integradores). Para a funcionalidade do WhatsApp, mensagens e
          metadados podem transitar pela infraestrutura da Meta.
        </p>
      </section>

      <section>
        <h2>6. Armazenamento e segurança</h2>
        <p>
          Armazenamos dados pelo tempo necessário às finalidades descritas.
          Aplicamos medidas técnicas e administrativas razoáveis para proteger
          os dados (ex.: HTTPS, controle de acesso). Nenhuma medida é 100%
          segura — se houver incidente relevante, comunicaremos usuários
          afetados conforme legislação aplicável.
        </p>
      </section>

      <section>
        <h2>7. Seus direitos</h2>
        <p>
          Você pode solicitar acesso, correção ou exclusão dos seus dados. Para
          exercer seus direitos, entre em contato pelo e-mail:{" "}
          <strong>privacy@easychat.example</strong>. Podemos pedir verificação
          de identidade antes de atender a algumas solicitações.
        </p>
      </section>

      <section>
        <h2>8. Consentimento e alterações</h2>
        <p>
          Ao usar o serviço, você concorda com esta política. Podemos
          atualizá-la; mudanças significativas serão notificadas. Consulte a
          versão mais recente nesta página.
        </p>
      </section>

      <section>
        <h2>9. Contato</h2>
        <p>
          Em caso de dúvidas sobre privacidade, entre em contato:{" "}
          <strong>privacy@easychat.example</strong> ou
          <br /> EasyChat — Rua Exemplo, 123 — Cidade, País.
        </p>
      </section>

      <footer style={{ marginTop: 24, fontSize: 13, color: "#666" }}>
        <p>
          Observação: este é um modelo. Ajuste o texto para refletir práticas
          reais, requisitos legais locais e as obrigações impostas pela Meta.
        </p>
      </footer>
    </main>
  );
};

export default PrivacyPolicy;
