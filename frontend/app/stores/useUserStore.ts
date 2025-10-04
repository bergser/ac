type User = {
  email: string;
};

const isUser = (obj?: any): obj is User => obj && Object.hasOwn(obj, "email");

export const useUserStore = defineStore("user", () => {
  const user = ref<User>();
  const { $db } = useNuxtApp();

  const authenticate = async (email: string, password: string) => {
    const { data } = await $db.auth.signInWithPassword({ email, password });
    if (!isUser(data.session?.user)) return;
    user.value = data.session?.user;
  };

  const fetchUser = async () => {
    const { data } = await $db.auth.getSession();
    if (!isUser(data.session?.user)) return;

    user.value = data.session?.user;
  };

  const signOut = async () => {
    const { error } = await $db.auth.signOut();
    if (error) return;
    user.value = undefined;
  };

  return { authenticate, fetchUser, user: computed(() => user.value), signOut };
});
