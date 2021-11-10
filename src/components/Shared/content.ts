import {
  BsFacebook,
  BsTwitter,
  BsLinkedin,
  BsWhatsapp,
  BsTelegram
} from 'react-icons/bs'

export default [
  {
    social: 'Facebook',
    url: 'http://www.facebook.com/sharer.php?u=',
    icon: BsFacebook
  },
  {
    social: 'Twitter',
    url: 'http://twitter.com/share?url=',
    icon: BsTwitter
  },
  {
    social: 'LinkedIn',
    url: 'https://www.linkedin.com/shareArticle?mini=true&url=',
    icon: BsLinkedin
  },
  {
    social: 'Whatsapp',
    url: 'https://api.whatsapp.com/send?text=',
    icon: BsWhatsapp
  },
  {
    social: 'Telegram',
    url: 'https://telegram.me/share/url?url=',
    icon: BsTelegram
  }
]
