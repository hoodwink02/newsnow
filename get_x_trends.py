import asyncio
from twikit import Client
import json
import sys

async def main():
    client = Client('en-US')
    USERNAME = sys.argv[1]
    EMAIL = sys.argv[2]
    PASSWORD = sys.argv[3]
    await client.login(
        auth_info_1=USERNAME,
        auth_info_2=EMAIL,
        password=PASSWORD
    )
    trends = await client.get_trends('global')
    print(json.dumps([trend.__dict__ for trend in trends]))

if __name__ == '__main__':
    asyncio.run(main())
