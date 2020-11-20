/* @flow */
import sgMail from '@sendgrid/mail';
import { error } from 'anymetrica-utils';
import { config } from './configurator';

/**
 * Message example:
 * const msg = {
 *   from: {
 *     email: 'noreply@anymetrica.com',
 *     name: 'Anymetrica.com',
 *   },
 *   to: 'i@anymetrica.com',
 *   cc: 'v@anymetrica.com',
 *   subject: 'Second morning morning, motherfucker',
 *   text: 'Take two and call me at the morning.',
 * };
 * @param content
 */
export const sendMail = (content) => {
  try {
    sgMail.setApiKey(config.SENDGRID_API_KEY);
    sgMail.send(content);
  } catch (e) {
    // TODO(Ilya): Add re-send and own queue
    error('Mailer error:', e);
  }
};

export const sendNoReply = content => sendMail({
  ...content,
  from: {
    email: 'noreply@anymetrica.com',
    name: 'Anymetrica.com',
  },
  subject: `[Anymetrica]: ${content.subject || ''}`,
});
