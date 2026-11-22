const animals = ['unicorn', 'panda', 'otter', 'falcon', 'lynx', 'koala', 'badger', 'walrus', 'meercat', 'pony'];

export const generateGuestName = () => {
    const animal = animals[Math.floor(Math.random() * animals.length)];
    const number = Math.floor(100 + Math.random() * 900);
    return `${animal}${number}`;
}