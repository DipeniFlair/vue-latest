<template>
    <section class="py-20 text-center text-white">
      <div class="container">
        <h1 class="text-[60px] mb-5">Log in here!</h1>
        <div class="max-w-xl mx-auto">
            <div class="bg-purple-900 bg-opacity-50 rounded-xl px-5 py-6">
                <form action="" method="post" class="" id="loginForm">
                    <div class="inputField">
                        <input type="email" name="" id="" placeholder="Email" required>
                    </div>
                    <div class="inputField">
                        <input type="password" name="" id="" placeholder="Password" required>
                    </div>
                    <div class="formBtnBox">
                        <button type="submit" class="btn">Login</button>
                    </div>
                </form>
            </div>
        </div>
      </div>
    </section>
  </template>
  <script>
  export default {
    name: "Login",
    data() {
      return {
        
      };
    },
    created () {
      document.title = "Login Here";
    }
  }
  </script>
  