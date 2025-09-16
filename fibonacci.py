def get_fibonacci(n: int):
    a, b = 0, 1
    for _ in range(n):
        a, b = a + b, a
    return a


def is_prime(number: int):
    return number > 1 and all(number % i for i in range(2, int(number**0.5) + 1))


def get_prime(n: int):
    primes = []
    number = 2
    while len(primes) < n:
        if is_prime(number):
            primes.append(number)
        number += 1
    return primes[-1]


print(get_fibonacci(10))
