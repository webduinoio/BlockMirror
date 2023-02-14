import asyncio
import js


import random

print("請輸入一個數字介於 1 到 50 之間：")

target_num = random.randint(1, 10)
guess_count = 0

while True:
    try:
        guess_num = int(input())
        guess_count += 1

        if guess_num < 1 or guess_num > 50:
            print("您輸入的數字超出範圍，請重新輸入！")
            continue
        elif guess_num > target_num:
            print("您猜的數字太大了，請重新輸入！")
            x = input('123123')
        elif guess_num < target_num:
            print("您猜的數字太小了，請重新輸入！")
        else:
            print("恭喜您猜對了！")
            print("您一共猜了 %d 次" % guess_count)
            break

        print("請繼續輸入一個數字介於 1 到 50 之間：")
    except ValueError:
        print("請輸入一個整數！")