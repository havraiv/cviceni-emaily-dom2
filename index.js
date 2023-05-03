import { Email } from './Email/index.js';
const renderSection = (emails, element) => {
  emails
    .map((email) => {
      if (email.unread) {
        email.unread = 'closed';
      } else {
        email.unread = 'opened';
      }
      return element.append(
        Email({
          senderName: email.sender.name,
          subject: email.subject,
          time: email.time,
          unread: email.unread,
        }),
      );
    })
    .join('');
};

fetch(`https://apps.kodim.cz/daweb/trening-api/apis/emails?folder=unread`)
  .then((response) => response.json())
  .then((data) =>
    renderSection(data.emails, document.getElementById('unread')),
  );

fetch(`https://apps.kodim.cz/daweb/trening-api/apis/emails?folder=read`)
  .then((response) => response.json())
  .then((data) => renderSection(data.emails, document.getElementById('read')));
