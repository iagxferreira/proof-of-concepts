import Mail from "../lib/Mail";

export default {
  key: 'MailRegister',
  options: {
    delay: 5000,
    priority: 3,
  },
  async handle({ data }) {
    const { user } = data;

    await Mail.sendMail({
      from: 'Iago <teste@teste.com.br>',
      to: `${user.name} <${user.email}>`,
      subject: 'Cadastro',
      html: `Olá, ${user.name}, bem-vindo ao nosso sistema.`
    });
  },
};