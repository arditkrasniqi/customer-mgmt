export default class Cookie {
    public static get(key: string) {
        var name = key + "=";
        var decodedCookie = decodeURIComponent(document.cookie);
        var ca = decodedCookie.split(';');
        for (var i = 0; i < ca.length; i++) {
            var c = ca[i];
            while (c.charAt(0) == ' ') {
                c = c.substring(1);
            }
            if (c.indexOf(name) == 0) {
                return c.substring(name.length, c.length);
            }
        }
        return null;
    }

    private static exists(key: string) {
        return this.get(key);
    }

    public static set(key: string, value: any) {
        if (!this.exists(key)) {
            document.cookie = `${key}=${value}`;
        }
        return this.get(key);
    }
}